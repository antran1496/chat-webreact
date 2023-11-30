/* global navigator, RTCSessionDescription, RTCIceCandidate, RTCPeerConnection, JitsiMeetExternalAPI, translate */
import { connect } from 'react-redux'
import * as Jsx from './rxGroupCall.jsx'

const RxComponent = global.rootRequire('components/shares/rxComponent').default
const { rxaget, secondsToTime, isElectron ,changeColorSVG} = global.rootRequire('classes/ulti')
const { checkNameUser } = global.rootRequire('classes/chat')
const { rxgetLocal } = global.rootRequire('classes/request')

const { netaCallHistoryUpdate, changeStatusTabmore, netaGroupCallUpdate, netaGroupCallStatusUpdate, netaGroupCallRemove } = global.rootRequire('redux')
const rxio = global.rootRequire('classes/socket').default

const iceServers = {
  iceServers: [{
    urls: ['turn:turn1.netalo.vn:3478'],
    username: 'developer',
    credential: 'password'
  }, {
    urls: ['stun:stun1.netalo.vn:3478'],
    username: 'developer',
    credential: 'password'
  }]
}

let mediaConstraints = {
  audio: true,
  video: true,
}

class Component_ extends RxComponent {
  constructor(props, context) {
    super(props, context, Jsx)
    this.state = {
      group: rxaget(this.props, 'group', {}),
      groupInfo: {group_fullname: '', avatar_url: ''},
      flagCalling: false,
      ringtone: false,
      flagStartCall: false,
      isStarted: false,
      flagMic: true,
      flagCamera: false,
      acceptCall: false,
      showInvite: false,
      seconds: 0,
      sernderInvite: {ava: '', name: ''},
      time: {h:'00',m:'00',s:'00'},
      owergroup: '',
      objStopCall: {}
    }

    this.userid = rxaget(this.props, 'netaauth.user.id', '')
    this.token = rxaget(this.props, 'netaauth.user.token', '')
    this.users = rxaget(this.props, 'user.users', {}) || {}
    this.type = rxaget(this.props, 'type', '')

    this.localStream = null
    this.remoteStream = null
    this.rtcPeerConnection = null
    this.timer = null
    this.timeoutCounter = null
    this.secondsCounter = 0
    
    this.isRoomCreator = false
    
    this.callObj = {}
    this.arrUserJoin = []
  }

  componentDidMount() {
    this.loadHandleSocket()  

    if (window && window.ipcRenderer) {
      window.ipcRenderer.on('close_groupcall', (event, args) => {
        this.setState({flagCalling: false, ringtone: false, acceptCall: false, owergroup: ''}, () => {
          let groupObj = { 
            group_id: Number(this.callObj.group_id), 
            message_id: this.callObj.message_id 
          }
          rxio.leaveGroupCall(groupObj, (data) => {
            this.callObj = {}
            this.arrUserJoin = []
          })
        })

      })
    }

  }

  loadHandleSocket() {
    rxio.getWaitConnect((data) => {
      if (rxio.connected) {
        rxio.socket.on('join_groupcall', async (data) => {
          let netaGroups = global.rxu.json(rxgetLocal('netaGroups'), {})
          if (netaGroups && netaGroups.groups && data.group_id && netaGroups.groups[data.group_id]) {
            let groupTmp = netaGroups.groups[data.group_id]
            data['group_fullname'] = (groupTmp && groupTmp.group_fullname) ? groupTmp.group_fullname : (groupTmp && groupTmp.group_name) ? groupTmp.group_name : groupTmp.name || ''
            data['avatar_url'] = netaGroups.groups[data.group_id]['avatar_url'] || ''
            let groupInfo = {
              group_fullname: data['group_fullname'],
              avatar_url: data['avatar_url'] 
            }

            this.props.netaGroupCallUpdate(data.group_id, data)

            this.setState({groupInfo: groupInfo})
          }
          
          if (data.joined_uins && data.joined_uins.indexOf(this.userid.toString()) !== -1) {
            this.onClickStopCall()
          } else {
            if (this.state.objStopCall && data.groupcall_id && !this.state.objStopCall[data.groupcall_id]) {
              if (!this.state.flagCalling) {
                if (this.callObj && !this.callObj.groupcall_id) {
                  if (this.arrUserJoin.indexOf(this.userid.toString()) === -1) {
                    this.setState({flagCalling: true, ringtone: true, acceptCall: true}, () => {
                      if (data && data.group_id && data.message_id) {
                        if (data.joined_uins && data.joined_uins.indexOf(this.userid.toString()) === -1) {
                          this.callObj = data  
                        }
                      }
                    })  
                  }
                } 
              }
            }
             
          }

          if (data.joined_uins) {
            this.arrUserJoin = this.arrUserJoin.concat(data.joined_uins[0])  
          }

          setTimeout(() => {
            if (this.state.ringtone) {
              this.onClickStopCall()
            }
          }, 30000)
        })

        rxio.socket.on('invite_groupcall', async (data) => {
          if (data && data.group_id && data.message_id && data.sender_uin && data.invited_uin && data.invited_uin.toString() === this.userid.toString()) {

            let objUsers = this.users
            let uname = (objUsers && objUsers[data.sender_uin]) ? checkNameUser(objUsers[data.sender_uin]) : ''
            let avatar_url = (objUsers && objUsers[data.sender_uin] && objUsers[data.sender_uin]['profile_url']) ? global.rxu.config.get_static + objUsers[data.sender_uin]['profile_url'] : ''

            this.callObj = data
            this.setState({showInvite: true, sernderInvite: {
              ava: avatar_url,
              name: uname
            }})
          }
        })
        
        rxio.socket.on('stop_groupcall', async (data) => {
          this.props.netaGroupCallRemove(data.group_id)
          this.onClickStopCall()
        })

        rxio.socket.on('message', (oMess) => {
          if (oMess.type === 6 && oMess['attachments'] && oMess['attachments'].indexOf('groupcall_id') !== -1 && oMess['attachments'].indexOf('stopped_at') !== -1) {
            this.props.netaGroupCallRemove(oMess.group_id)
          }
        })
        
      } else {
        setTimeout(() => {
          this.loadHandleSocket()  
        }, 300)
      }
    })
  }

  componentDidUpdate (prevProps, prevState) {
    if ((rxaget(this.props, 'netaGroupCall.status', '') !== rxaget(prevProps, 'netaGroupCall.status', '')) && ['groupcall'].indexOf(rxaget(this.props, 'netaGroupCall.type_call', '')) !== -1) {
      let typecall = (rxaget(this.props, 'netaGroupCall.type_call', '') === 'groupcall') ? 2 : 1
      let grouptmp = rxaget(this.props, 'netaGroupCall.payload', {})
      
      if (!rxaget(this.callObj, 'groupcall_id', '')) {
        if (grouptmp.message_id) {
          this.setState({flagCalling: true}, () => {
            this.joinGroupCall(grouptmp)
          })
        } else {
          this.onClickStartCall(typecall, grouptmp)
        }  
      }
    }
  }

  onClickStartCall(type, grouptmp) {
    if (!this.state.flagCalling) {
      this.setState({flagCalling: true, owergroup: this.userid}, () => {
        rxio.createGroupCall({group_id: Number(grouptmp.group_id), type: 2 }, (data) => {
          if (data && data.groupcall && data.groupcall.group_id && data.groupcall.message_id) {
            this.callObj = data.groupcall
            this.joinGroupCall(data.groupcall)
          }
        })
      })  
    }
  }

  onClickStopCall() {
    let objStopCall = this.state.objStopCall || {}
    if (objStopCall && this.callObj.group_id) {
      if (!objStopCall[this.callObj.group_id]) {
        objStopCall[this.callObj.groupcall_id] = true
      }
    }
    this.props.netaGroupCallStatusUpdate(this.callObj.group_id, {status: true, oncall: false})
    this.setState({acceptCall: false, flagCalling: false, ringtone: false, owergroup: '', objStopCall: objStopCall}, () => {
      this.callObj = {}
      this.arrUserJoin = []
    })
  }

  acceptCall() {
    let callObj = this.callObj
    this.setState({acceptCall: false, ringtone: false}, () => {
      if (callObj.group_id && callObj.message_id) {
        this.props.netaGroupCallStatusUpdate(callObj.group_id, {status: true, oncall: true})
        this.joinGroupCall(callObj)
      }
    })
  }

  joinGroupCall(data) {
    let objUsers = this.users
    if (!objUsers[this.userid]) {
      let rxusers = rxgetLocal('rxusers')
      try { if (typeof(rxusers) !== 'undefined') { objUsers = JSON.parse(rxusers) } } catch(e) {}
    }
    let uname = (objUsers && objUsers[this.userid]) ? checkNameUser(objUsers[this.userid]) : ''
    let avatar_url = (objUsers && objUsers[this.userid] && objUsers[this.userid]['profile_url']) ? global.rxu.config.get_static + objUsers[this.userid]['profile_url'] : ''

    let msgJoin = {
      group_id: Number(data.group_id),
      message_id: data.message_id,
      display_name: uname || '',
      avatar_url: avatar_url || ''
    }

    let msgPing = {
      group_id: Number(data.group_id),
      message_id: data.message_id,
    }

    let msgJitsi = {
      roomName: data.message_id,
      userInfo: {
        displayName: uname,
        avatarUrl: avatar_url || ''
      },
      configOverwrite: {
        tokenNetalo: this.token,
        cdnEndpoint: global.rxu.config.cdn_endpoint,
        apiEndpoint: global.rxu.config.base_api_neta+'/',
        userIdNetalo: this.userid.toString()
      },
      jwt: '',
      parentNode: document.querySelector('#meet'),
      onload: this.loadClassContainer()
    }

    rxio.joinGroupCall(msgJoin, (dataJoin) => {
      if (dataJoin && dataJoin.jwt_token) {
        rxio.pingGroupCall(msgPing)  
        msgJitsi['jwt'] = dataJoin.jwt_token
        this.initJitsi(msgJitsi, { group_id: Number(data.group_id), message_id: data.message_id })
      } else if (dataJoin && dataJoin.result === 1) {
        rxio.leaveGroupCall({
          group_id: Number(data.group_id),
          message_id: data.message_id
        }, (data) => {
          rxio.joinGroupCall(msgJoin, (dataJoinNew) => {
            if (dataJoinNew && dataJoinNew.jwt_token) {
              rxio.pingGroupCall(msgPing)  
              msgJitsi['jwt'] = dataJoinNew.jwt_token
              this.initJitsi(msgJitsi, { group_id: Number(data.group_id), message_id: data.message_id })
            } else {
              alert(translate('You were on a group call')) 
            }
          })
        })
      }
    })
  }

  loadClassContainer() {
    try {
      let elem = document.getElementById('zidchat_callscreen')
      if (elem) {
        elem.style.width = '100%'
        elem.style.height = '100%'
        elem.style.position = 'absolute'
        elem.style.left = '0px'
        elem.style.top = '0px'
        elem.style.zIndex = '12'  
      }
    } catch(e) {

    }
  }

  getAvatar(e, user) {
    if (user.profile_url) {
      e.target.src=global.rxu.config.get_static + user.profile_url  
    } else {
      e.target.src='./images/default/static/avadefault.svg'
    }
  }

  initJitsi(configs, groupObj) {
    if (isElectron()) {
      delete configs.parentNode
      delete configs.onload

      this.setState({flagCalling: false, ringtone: false, acceptCall: false, owergroup: ''}, () => {
        window.ipcRenderer.send('data_groupcall', {
          configs: configs,
          groupObj: groupObj,
          callObj: this.callObj
        })
      })
    } else {
      try {
        const domain = global.rxu.config.meet_endpoint;
        const api = new JitsiMeetExternalAPI(domain, configs);      

        if (configs && configs.userInfo && configs.userInfo.avatarUrl) {
          api.executeCommand('avatarUrl', configs.userInfo.avatarUrl);
        }

        api.on('readyToClose', () => {
          this.setState({flagCalling: false, ringtone: false, acceptCall: false, owergroup: ''}, () => {
            this.callObj = {}
            this.arrUserJoin = []
            rxio.leaveGroupCall(groupObj, (data) => {
            })
            this.props.netaGroupCallStatusUpdate(groupObj.group_id, {status: true, oncall: false})
          })
        });

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
        this.onClickStopCall()
      }
    }
  }

  onClickCancelInvite() {
    this.callObj = {}
    this.arrUserJoin = []
    this.setState({showInvite: false, sernderInvite: {ava: '', name: ''}})
  }

  onClickAcceptInvite() {
    this.setState({showInvite: false, flagCalling: true, sernderInvite: {ava: '', name: ''}}, () => {
      let callObj = this.callObj
      if (callObj.group_id && callObj.message_id) {
        this.joinGroupCall(callObj)
      }
    })
  }

  render() {
    return this.renderComponent()
  }
}

const mapStateToProps = (state, ownProps) => ({
  themeValue: state.themeValue,
  langValue: state.langValue,
  rxgroup: state.rxgroup,
  user: state.user,
  netaauth: state.netaauth,
  netaCallHistory: state.netaCallHistory,
  netaGroupCall: state.netaGroupCall
})

const mapDispatchToProps = {
  netaCallHistoryUpdate,  
  changeStatusTabmore,
  netaGroupCallUpdate,
  netaGroupCallStatusUpdate,
  netaGroupCallRemove
}

const ComponentWrapped = connect(
  mapStateToProps,
  mapDispatchToProps
)(Component_)

export default ComponentWrapped
