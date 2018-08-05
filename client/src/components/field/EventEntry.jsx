import React from 'react';
import { sportNumConv, blockToTime, sportPicture } from '../../../utils';
import { withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';
import moment from 'moment';
import axios from 'axios';
import FormError from '../FormError.jsx';
/**
 * todo I think this component could be stateless but the withRouter as I understand it only works with stateful components
 * @description Component that renders a single event entry
 */
class EventEntry extends React.Component {
  constructor(props) {
    super(props);
    this.state = { // will need the fieldId
      id: props.data.id,
      eventName: props.data.eventName,
      sportId: props.data.sportId,
      date: props.data.date,
      startBlock: props.data.startBlock,
      endBlock: props.data.endBlock,
      notes: props.data.notes,
      isEditable: false,
      timeConflict: true,
    };
    console.log(props.data.sportId);

    this.handleEditAction = event => {
      event.preventDefault();
      event.stopPropagation();
      this.setState(state => {
        return {
          isEditable: true
        }
      })
    }

    this.handleSubmitAction = event => {
      event.preventDefault();
      event.stopPropagation();
      console.log('inside handleSubmitAction: ', this.state);
      axios
        .put(`/api/event/`, this.state, {
          headers: {},
        })
        .then(response => {
          // show successful message to user
          console.log(response);
        })
        .catch(error => {
          if (error.response.status == 401 && error.response.data === 'user not logged in') {
            this.toggleAuth(false);
          } else if (error.response.status == 400) {
            // todo this error should be refactored on server to not be a general error but an error specific to time conflicts
            this.setState({ timeConflict: true });
          } else {
            utils.errorHandler(error);
          }
        });
    }

    this.changeTarget = props.changeTarget;
  }


  render() {

    let viewMode = null;
    if (this.state.isEditable) {
      viewMode = (
        <form >
          <FormError check={this.state.timeConflict} message={'*There is already an event scheduled for this time*'} />

          <input className='eventName' value={this.state.eventName} onChange={e => {
            e.stopPropagation();
            //e.persist();
            console.log('eventName value: ', e.target.value);
            let eventName = e.target.value;
            this.setState(state => {
              return {
                eventName: eventName,
              }
            })
          }} />
          {/*SportId will need to be drop down selector*/}
          <input className='sportId' value={this.state.sportId} onChange={e => {
            e.stopPropagation();
            console.log('sportId value: ', e.target.value);
            let sportId = e.target.value;
            this.setState(state => {
              return {
                sportId: sportId
              }
            })
          }} />
          <input className='newDate' value={this.state.date} onChange={e => {
            e.stopPropagation();
            console.log('newDate value: ', e.target.value);
            let newDate = e.target.value;
            this.setState(state => {
              return {
                date: newDate
              }
            })
          }}
          />
          {/*startBlock input will take a value from 1 to 47 */}
          <input className='startBlock' value={this.state.startBlock}
            onChange={e => {
              e.stopPropagation();
              console.log('startBlock value: ', e.target.value);
              let startBlock = e.target.value;
              this.setState(state => {
                return {
                  startBlock: +startBlock
                }
              })
            }}
          />
          <input className='endBlock' value={this.state.endBlock}
            onChange={e => {
              e.stopPropagation();
              let endBlock = e.target.value;
              this.setState(state => {
                return {
                  endBlock: +endBlock
                }
              })
            }}
          />
          <input className='notes' value={this.state.notes} onChange={e => {
            e.stopPropagation();
            console.log('notes value: ', e.target.value);
            let notes = e.target.value;
            this.setState(state => {
              return {
                notes: notes
              }
            })
          }}
          />
          <button className='submitBtn' type='submit' onClick={this.handleSubmitAction}>Submit</button>
        </form>
      )
    } else {
      viewMode = (
        <div className="fieldeventinfo">
          <div>Event Name:{this.state.eventName}</div>
          <div>Sport: {sportNumConv(this.state.sportId)}</div>
          <div>Date: {moment(this.state.date).format('LL')}</div>
          <div>Time: {blockToTime(this.state.startBlock) + ' to ' + blockToTime(this.state.endBlock)}</div>
          <div>Notes: {this.state.notes}</div>
          <button className='editBtn' onClick={this.handleEditAction}>Edit</button>
        </div>

      )
    }



    return (
      <div className="field-event-entry hover-lightblue" >
        <div className="sporticon"
          onClick={() => {
            this.changeTarget({ type: 'event', id: this.state.id });
            this.props.history.push('/event');
          }}
        >
          <img src={sportPicture(this.state.sportId)} width="150" />
        </div>

        <div className='triggerEventEdits'>
          {viewMode}
        </div>
      </div>
    );
  }
}

EventEntry.propTypes = {
  data: PropTypes.object.isRequired,
};

export default withRouter(EventEntry);
