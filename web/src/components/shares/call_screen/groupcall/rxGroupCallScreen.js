/* global navigator, RTCSessionDescription, RTCIceCandidate, RTCPeerConnection, JitsiMeetExternalAPI */
import { connect } from 'react-redux'
import * as Jsx from './rxGroupCallScreen.jsx'

const RxComponent = global.rootRequire('components/shares/rxComponent').default
const { rxaget, secondsToTime, isElectron ,changeColorSVG} = global.rootRequire('classes/ulti')
const { checkNameUser } = global.rootRequire('classes/chat')
const { rxgetLocal } = global.rootRequire('classes/request')

const rxio = global.rootRequire('classes/socket').default

let mediaConstraints = {
  audio: true,
  video: true,
}

class Component_ extends RxComponent {
  constructor(props, context) {
    super(props, context, Jsx)
    this.state = {}
    this.callObj = {}

    this.userid = rxaget(this.props, 'netaauth.user.id', '')
    this.token = rxaget(this.props, 'netaauth.user.token', '')
  }

  componentDidMount() {
    if (window && window.ipcRenderer) {
      window.ipcRenderer.on('configs_groupcall', (event, args) => {
        if (args && args.configs) {
          args.configs['parentNode'] = document.querySelector('#meet')
        }
        this.callObj = args.callObj
        this.initJitsi(args.configs, args.groupObj)
      })
    }

    if (this.token && this.userid) {
      if (!rxio.connected && !rxio.init_connected) {
        rxio.login(this.token, this.userid, (data) => {
        })
      }
    }
  }

  initJitsi(configs, groupObj) {
    try {
      const domain = global.rxu.config.meet_endpoint;
      const api = new JitsiMeetExternalAPI(domain, configs);      

      if (isElectron()) {
        try {
          window.screenSharingRender(api)
        } catch(e1) {} 
      }

      if (configs && configs.userInfo && configs.userInfo.avatarUrl) {
        api.executeCommand('avatarUrl', configs.userInfo.avatarUrl);
      }

      api.on('readyToClose', () => {
        this.callObj = {}
        if (window && window.ipcRenderer) {
          window.ipcRenderer.send('stop_groupcall')  
        }
      })

      api.on('inviteFriend', (data) => {
        if (data && data.inviteId) {
          let mess = {
            group_id: Number(this.callObj.group_id),
            message_id: this.callObj.message_id,
            sender_uin: this.userid,
            invited_uin: Number(data.inviteId)
          }
          rxio.inviteGroupCall(mess, (data) => {
            console.log(data)
          })
        }
      })
    } catch(e) {
      if (window && window.ipcRenderer) {
        window.ipcRenderer.send('stop_groupcall')  
      }
    }
  }

  render() {
    return this.renderComponent()
  }
}

const mapStateToProps = (state, ownProps) => ({
  netaauth: state.netaauth
})

const mapDispatchToProps = {}

const GroupCallContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(Component_)

export default GroupCallContainer
