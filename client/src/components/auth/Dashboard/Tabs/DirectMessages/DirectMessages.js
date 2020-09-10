import React from 'react'
import PropTypes from 'prop-types'
import DirectMessage from './DirectMessage/DirectMessage'

const DirectMessages = ({user, socket})=> {
    return (
        <div>
            List of direct messages from user
            <DirectMessage user={user} socket={socket} />
        </div>
    )
}

DirectMessages.propTypes = {

}

export default DirectMessages
