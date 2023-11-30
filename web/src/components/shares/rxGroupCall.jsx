/*global translate*/
import React from 'react'
const { rxgetLocal } = global.rootRequire('classes/request')
const { rxChangeSlug, stringToColour, autoConvertTime, subString, rxaget ,changeColorSVG} = global.rootRequire('classes/ulti')
const { checkNameUser } = global.rootRequire('classes/chat')
global.isclient && require('./rxGroupCall.css')

export const renderComponent = (vm) => {
  return (<div>
    { vm.state.showInvite && <div className='zchat_groupcall_invite'>
      <div className='zchat_groupcall_avatar'>
        {(vm.state.sernderInvite && vm.state.sernderInvite.ava) && <img src={vm.state.sernderInvite.ava} alt='profile_url' onError={(e) => {e.target.onerror = null; e.target.src = './images/default/static/avadefault.svg' }} />} 
        {(vm.state.sernderInvite && !vm.state.sernderInvite.ava) && <img alt='avadefault' src={'./images/default/static/avadefault.svg'} />} 
      </div>
      <div className='zchat_groupcall_desc'>
        {(vm.state.sernderInvite && vm.state.sernderInvite.name) && <span>{vm.state.sernderInvite.name} mời bạn tham gia cuộc gọi nhóm</span>} 
        {(vm.state.sernderInvite && !vm.state.sernderInvite.name) && <span>Có người mời bạn tham gia cuộc gọi nhóm</span>} 
      </div>
      
      <div className='zgroupcall_button'>
        <div className='zcall_group_button'>
          <div className='zgroupcall_btn' >
            <img className='zcall_cancel' alt='' src={changeColorSVG('./images/default/icons/cancelcall.png')} onClick={e => vm.onClickCancelInvite()} />
          </div>
          <div className='zgroupcall_btn' >
            <img className='zcall_answer' alt='' src={changeColorSVG('./images/default/icons/acceptcall.png')} onClick={e => vm.onClickAcceptInvite()} />
          </div>
        </div>
      </div>
    </div>}

  	{ vm.state.flagCalling && vm.renderZCall() }
  </div>)
}

export const renderZCall = (vm) => {
  let typeCall = rxaget(vm.callObj, 'media_type', 1)
  let remote_uin = rxaget(global.rxu.array(rxaget(vm.callObj, 'callee_uins', [])).filter(ele => (ele !== vm.userid.toString())), '0', '')
  let objUsers = vm.users
  if (!objUsers[remote_uin]) {
    let rxusers = rxgetLocal('rxusers')
    try { if (typeof(rxusers) !== 'undefined') { objUsers = JSON.parse(rxusers) } } catch(e) {}
  }
  let uname = (objUsers[remote_uin]) ? checkNameUser(objUsers[remote_uin]) : ''
  
  return <div id='zidchat_callscreen' className={(vm.state.ringtone) ? 'zchat_callscreen' : ''}>
	  <div id='meet'></div>
    {vm.state.acceptCall && <div>
      {vm.state.ringtone && <audio controls autoPlay hidden loop>
        <source src='./sounds/soundcallmess.mp3' type='audio/mpeg' />
      </audio>}
      <div className='zchat_groupcallscreen_bg'></div>
      <div className='zchat_callscreen_main'>
        <div className='zchat_callcenter'>
          <img className='zchat_callbox_close' alt='' src={changeColorSVG('./images/default/icons/icon-close.png')} onClick={e => vm.onClickStopCall()}/>
          <div className='zchat_callbox'>
            <div className='zchat_callInfo'>

              <div className='zcall_container'>
                <div className='zcall_info'>{rxaget(vm.state.groupInfo, 'group_fullname', '')}</div>
                <div className='zcall_content'>
                  {translate('Contacting...')}
                </div>
                
                <div className='zcall_avatar'>
                  {rxaget(vm.state.groupInfo, 'avatar_url', '') && <img className='zcall_avatarimg' src={`${global.rxu.config.cdn_endpoint}` + rxaget(vm.state.groupInfo, 'avatar_url', '')} alt='profile_url' onError={(e) => {e.target.onerror = null; e.target.src = './images/default/static/avadefault.svg' }} />}                  
                  {!(rxaget(vm.state.groupInfo, 'avatar_url', '')) && <span className='zgroupcall-ava-span_header' style={{ background: `linear-gradient(120deg, ${stringToColour('FFF' + rxaget(vm.state.groupInfo, 'group_fullname', '').slice(0, 2).toUpperCase())}, #FFFFFF)` }}>{rxChangeSlug(rxaget(vm.state.groupInfo, 'group_fullname', ''),true).slice(0, 2).toUpperCase()}</span>}
                </div>
                
                <div className='zcall_buttons' id='zcall_buttons'>
                  <div className='zcall_group_button'>
                    
                    <div className='zcall_button' >
                      <img className='zcall_cancel' alt='' src={changeColorSVG('./images/default/icons/cancelcall.png')} onClick={e => vm.onClickStopCall()} />
                    </div>
                    <div className='zcall_button' >
                      <img className='zcall_answer' alt='' src={changeColorSVG('./images/default/icons/acceptcall.png')} onClick={e => vm.acceptCall()} />
                    </div>

                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>}
  </div>
}