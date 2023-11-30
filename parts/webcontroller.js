import React, { Component } from 'react'
const { apiget } = global.rootRequire('classes/request')
const RxCrud = global.rootRequire('components/shares/rxCrud').default
const RxUpload = global.rootRequire('components/shares/rxUpload').default
const RxToggle = global.rootRequire('components/shares/rxToggle').default

const { AdminBlock } = global.rootRequire('components/shares/rxTemplates')

class [[RXNAME]]Component extends Component {  

  constructor (props) {
    super(props)    
    this.state = {}
  }

  // R E N D E R S
  render() {        
    return (
      <AdminBlock name='[[RXNAME]]' desc='[[RXNAME]]'>
        <div className='rxcol-100'>
          <RxCrud name={'[[RXNAME]]'} api={'[[RXAPI]]'} form={[
          {name: 'Picture', func: (inthis) => (<RxUpload callback={(e) => inthis.callbackUpload(e)} images={inthis.state.editingData.img_landscape} />)},

          { type: 'devide' },
          {name: 'Name', func: (inthis) => (<input tabIndex='1' type='text' value={inthis.state.editingData.name} onChange={(e) => inthis.onBlurData(e, 'name')} className='fullwidth-input' />)},
          {name: 'Desc', func: (inthis) => (<input tabIndex='2' type='text' value={inthis.state.editingData.desc} onChange={(e) => inthis.onBlurData(e, 'desc')} className='fullwidth-input' />)},
// [[RX_WEB_DATA_CUSTOM]] //
// [[RX_WEB_DATA_CUSTOM_END]] //
          { type: 'devide' },              
          {name: 'Status', func: (inthis) => (<RxToggle value={inthis.state.editingData.is_active} onToggle={(newValue) => inthis.onBlurDataValue(newValue, 'is_active')} />)}
          ]} />
        </div>
      </AdminBlock>
    )
  }
}

export default [[RXNAME]]Component