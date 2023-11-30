/*global translate*/
import React from 'react'
const { rxgetLocal } = global.rootRequire('classes/request')
const { rxaget ,changeColorSVG} = global.rootRequire('classes/ulti')
const { checkNameUser } = global.rootRequire('classes/chat')

global.isclient && require('./rxGroupCallScreen.css')

export const renderComponent = (vm) => {
  return <div className='zchat_groupcall_fullscreen'>
    <div id='meet'></div>
  </div>
}