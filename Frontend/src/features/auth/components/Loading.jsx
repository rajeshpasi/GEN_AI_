import './loading.scss'

const Loading = ({ message = 'Loading...' }) => {
  return (
    <div className="loading-overlay">
      <div className="loading-content">
        <div className="loading-dots">
          <span></span>
          <span></span>
          <span></span>
        </div>
        <p className="loading-message">{message}</p>
      </div>
    </div>
  )
}

export default Loading
