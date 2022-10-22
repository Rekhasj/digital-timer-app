// Write your code here
import {Component} from 'react'
import './index.css'

class DigitalTimer extends Component {
  state = {clock: 25, timeSeconds: 0, isClockStarted: false}

  componentWillUnmount() {
    clearInterval(this.timerId)
  }

  getTimeIncrementInSeconds = () => {
    const {clock, timeSeconds} = this.state
    const isTimerCompleted = timeSeconds === clock * 60
    if (isTimerCompleted) {
      clearInterval(this.timerId)
      this.setState({isClockStarted: false})
    } else {
      this.setState(prevState => ({
        timeSeconds: prevState.timeSeconds + 1,
      }))
    }
  }

  onClickTimer = () => {
    const {clock, timeSeconds, isClockStarted} = this.state
    const isTimerCompleted = timeSeconds === clock * 60

    if (isTimerCompleted) {
      this.setState({timeSeconds: 0})
    }
    if (isClockStarted) {
      clearInterval(this.timerId)
    } else {
      this.timerId = setInterval(this.getTimeIncrementInSeconds, 1000)
    }

    this.setState(prevState => ({isClockStarted: !prevState.isClockStarted}))
  }

  onClickMinusTime = () => {
    this.setState(prevState => ({clock: prevState.clock - 1}))
  }

  onClickAddTime = () => {
    this.setState(prevState => ({clock: prevState.clock + 1}))
  }

  onClickReset = () => {
    // const {clock, isClockStarted, timeSeconds} = this.state

    clearInterval(this.timerId)
    this.setState({clock: 25, isClockStarted: false, timeSeconds: 0})
  }

  getTimeInSecondsFormat = () => {
    const {clock, timeSeconds} = this.state
    const totalSeconds = clock * 60 - timeSeconds

    const minutes = Math.floor(totalSeconds / 60)
    const seconds = Math.floor(totalSeconds % 60)

    const stringifiedMinutes = minutes > 9 ? minutes : `0${minutes}`
    const stringifiedSeconds = seconds > 9 ? seconds : `0${seconds}`

    return `${stringifiedMinutes}:${stringifiedSeconds}`
  }

  render() {
    const {clock, timeSeconds, isClockStarted} = this.state
    const isDisabled = timeSeconds > 0

    const playImageUrl =
      'https://assets.ccbp.in/frontend/react-js/play-icon-img.png'
    const pauseImageUrl =
      'https://assets.ccbp.in/frontend/react-js/pause-icon-img.png'

    const imageUrl = isClockStarted ? pauseImageUrl : playImageUrl
    const altText = isClockStarted ? 'pause icon' : 'play icon'
    const displayText = isClockStarted ? 'Pause' : 'Start'
    const status = isClockStarted ? 'Running' : 'Paused'

    return (
      <div className="timer-container">
        <h1 className="heading">Digital Timer</h1>
        <div className="timer-card-container">
          <div className="digital-timer-container ">
            <div className="circle-container">
              <h1 className="clock">{this.getTimeInSecondsFormat()}</h1>
              <p className="status">{status}</p>
            </div>
          </div>
          <div className="digital-status-container">
            <div className="button-container">
              <button
                type="button"
                className="icon-button"
                onClick={this.onClickTimer}
              >
                <img className="icon-image" alt={altText} src={imageUrl} />
                {displayText}
              </button>

              <button type="button" className="icon-button">
                <img
                  className="icon-image"
                  alt="reset icon"
                  src="https://assets.ccbp.in/frontend/react-js/reset-icon-img.png"
                  onClick={this.onClickReset}
                />{' '}
                Reset
              </button>
            </div>
            <div>
              <p className="details">Set Timer limit</p>
              <div className="set-timer-container">
                <button
                  type="button"
                  className="set-button"
                  disabled={isDisabled}
                  onClick={this.onClickMinusTime}
                >
                  -
                </button>
                <p className="countdown">{clock}</p>
                <button
                  type="button"
                  className="set-button"
                  disabled={isDisabled}
                  onClick={this.onClickAddTime}
                >
                  +
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }
}
export default DigitalTimer
