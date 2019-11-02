import React, {Component} from 'react';
import {ButtonGroup, Button} from 'reactstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTag, faSyncAlt } from '@fortawesome/free-solid-svg-icons';
// import { getPlanByState, getPlandetailByPlanId, countWaitingTicket } from '../../util/API';

class ActionButton extends Component {
    constructor(props) {
        super(props);
        this.state = {
        
          }
    }

    handleRefresh = (event) => {
        event.preventDefault();

    }

    render() { 
        return ( 
        <div>
            <ButtonGroup vertical>
                <Button onClick={(e) => this.handleRefresh(e)}>
                    <FontAwesomeIcon icon={faSyncAlt} />
                </Button>
                <Button>
                    <FontAwesomeIcon icon={faTag} />
                </Button>
            </ButtonGroup>
        </div>
        );
    }
}
 
export default ActionButton;