import Modal from 'react-modal';

const customStyles = {
    content: {
      top: '50%',
      left: '50%',
      right: 'auto',
      bottom: 'auto',
      marginRight: '-50%',
      transform: 'translate(-50%, -50%)',
    },
  };

  type propTypes = {
      show: boolean,
      onClose: Function,
      text: string
      
  }
function LoginMessage({show, onClose, text}:propTypes) {



    return (
      <Modal
        isOpen={show}
        onRequestClose={()=>onClose()}
        style={customStyles}
        contentLabel="Example Modal"
      >
        <form> 
        <h2>{text}</h2>
        <button onClick={()=>onClose()}>OK</button>  
        </form>     
      </Modal>
    );
}

export default LoginMessage
