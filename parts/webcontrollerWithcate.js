import React, { Component } from 'react'

const { apiget } = global.rootRequire('classes/request')
const RxCrud = global.rootRequire('components/shares/rxCrud').default
const RxSelectbox = global.rootRequire('components/shares/rxSelectbox').default
const RxUpload = global.rootRequire('components/shares/rxUpload').default
const RxToggle = global.rootRequire('components/shares/rxToggle').default

class [[RXNAME]]Component extends Component {
  constructor (props) {
    super(props)
    this.state = { flagUpdateCat: false, curCat: 0, cate: [] }

    this.onClickCatItem = this.onClickCatItem.bind(this)
    this.runUpdateCat = this.runUpdateCat.bind(this)
    this.fetchData = this.fetchData.bind(this)

    this.renderCatBody = this.renderCatBody.bind(this)

    this.fetchData()
  }

  componentDidMount () {
  }

  fetchData () {
    apiget(global.rxu.config.[[RXAPICATE]], { pg_size: 100 }, { '1': (json) => { this.setState({ cate: json.data, flagUpdateCat: !this.state.flagUpdateCat }) } })
  }

  onClickCatItem (e) {
    this.setState({ flagUpdateCat: !this.state.flagUpdateCat, curCat: e._id })
  }

  runUpdateCat (e) {
    let paging = (this.state.curCat) ? { searchid_appdist: this.state.curCat, st_col: 'created_at', st_type: -1, pg_page: 1, pg_size: 10 } : { st_col: 'created_at', st_type: -1, pg_page: 1, pg_size: 10 }
    e.inthis.setState({ paging: paging }, () => { e.inthis.fetchData() })
  }

  // R E N D E R S
  renderCatHead (inthis) {
    return (<tr>
      <th className='rxwidth--100'>Pic</th>
      <th className={inthis.helpSortClass('name')} onClick={(e) => inthis.onClickSort(e, 'name')} >Name</th>
      <th className='rxwidth--100'>Action</th>
    </tr>)
  }

  renderCatBody (inthis) {
    let tempData = global.rxu.array(inthis.state.data).slice(0)
    tempData.unshift({ _id: 0, name: 'All cate' })
    return tempData.map((perdata, index) => (
      <tr key={perdata._id} onClick={(e) => inthis.run('onClickCatItem', perdata)} className={(this.state.curCat === perdata._id) ? 'betable__row--active' : ''}>
        <td><img className='betable__img' alt={perdata.name} src={global.rxu.config.base_api + '/upload/image/' + (perdata.img_landscape || 'ico_app_default.jpg')} /></td>
        <td>{perdata.name}</td>
        { perdata._id !== 0 ? inthis.renderTableBodyBtns(inthis, perdata) : <td /> }
      </tr>))
  }

  renderHead (inthis) {
    return (<tr>
      <th className='rxwidth--100'>Picture</th>
      <th className={inthis.helpSortClass('name', ['rx-th-width-220'])} onClick={(e) => inthis.onClickSort(e, 'name')} >Name</th>
      <th className='rxwidth--100'>Cate</th>
      <th className={inthis.helpSortClass('created_at')} onClick={(e) => inthis.onClickSort(e, 'created_at')}>Created at</th>
      <th className='rxwidth--100'>Action</th>
    </tr>)
  }

  renderBody (inthis) {
    return global.rxu.array(inthis.state.data).map(perdata => (<tr key={perdata._id}>
      <td><img className='betable__img' alt={perdata.name} src={global.rxu.config.base_api + '/upload/image/' + (perdata.img_landscape || 'ico_app_default.png')} /></td>
      <td>{perdata.name}</td>
      <td><small>{inthis.helpProductcat(perdata.appdistobj)}</small></td>
      <td><small>{global.rxu.date(perdata.created_at)}</small></td>
      <td>
        { inthis.state.paging.search_is_deleted !== 1 &&
          <div> {(perdata.is_hot) && <span className='betable__icohot'><span className='icon-fire' />Hot</span>}
            {(perdata.is_active !== 0) && <span className='betable__icoon'>On</span>}{(perdata.is_active === 0) && <span className='betable__icooff'>Off</span>}
            <span className='betable__btnedit' onClick={(e) => inthis.onClickDataEdit(e, perdata)}><i className='icon-pencil' /></span>
            <span className='betable__btndelete' onClick={(e) => inthis.onClickDataDelete(e, perdata)}><i className='icon-close' /></span> </div> }
        { inthis.state.paging.search_is_deleted === 1 &&
          <div> <span className='betable__restore' onClick={(e) => inthis.onClickDataRestore(e, perdata)}>Restore</span></div>}
      </td>
    </tr>))
  }

  render () {
    return (
      <div className='adblock'>
        <div className='adblock__head'>
          <div className='adblock__title'>[[RXNAME]]</div>
          <div className='adblock__desc'>Manage [[RXNAME]]</div>
        </div>
        <div className='adblock__body'>
          <div className='row adblock__inner'>
            <div className='rxcol-30'>
              <RxCrud renderTableHead={this.renderCatHead} dataCallback={this.fetchData} renderTableBody={this.renderCatBody} onClickCatItem={this.onClickCatItem} name={'[[RXNAME]]cate'} api={'[[RXAPICATE]]'} form={[
                { name: 'Cate name', func: (inthis) => (<input tabIndex='1' type='text' value={inthis.state.editingData.name} onChange={(e) => inthis.onBlurData(e, 'name')} className='fullwidth-input' />) },
                { type: 'devide' },
                { name: 'Status', func: (inthis) => (<RxToggle value={inthis.state.editingData.is_active} onToggle={(newValue) => inthis.onBlurDataValue(newValue, 'is_active')} />) }
              ]} />
            </div>

            <div className='rxcol-70'>
              <RxCrud renderHead={this.renderHead} flagUpdate={this.state.flagUpdateCat} parentUpdate={this.runUpdateCat} renderBody={this.renderBody} name={'[[RXNAME]]'} api={'[[RXAPI]]'} form={[
                { name: 'Picture', func: (inthis) => (<RxUpload callback={(e) => inthis.callbackUpload(e)} images={inthis.state.editingData.img_landscape} />) },
                { name: 'Name', func: (inthis) => (<input tabIndex='1' type='text' value={inthis.state.editingData.name} onChange={(e) => inthis.onBlurData(e, 'name')} className='fullwidth-input' />) },
                { name: 'Desc', func: (inthis) => (<input tabIndex='2' type='text' value={inthis.state.editingData.desc} onChange={(e) => inthis.onBlurData(e, 'desc')} className='fullwidth-input' />) },
                // [[RX_WEB_DATA_CUSTOM]] //
                { name: 'donejob', func: (inthis) => (<input tabIndex='2' type='text' value={inthis.state.editingData.donejob} onChange={(e) => inthis.onBlurData(e, 'donejob')} className='fullwidth-input' />) },
                { name: 'innotime', func: (inthis) => (<input tabIndex='2' type='text' value={inthis.state.editingData.innotime} onChange={(e) => inthis.onBlurData(e, 'innotime')} className='fullwidth-input' />) },
                // [[RX_WEB_DATA_CUSTOM_END]] //
                { name: 'Cate name', func: (inthis) => (<RxSelectbox options={this.state.cate} results={inthis.state.editingData.appdist || ''} onChange={(result) => { inthis.onBlurDataValue(result, 'appdist') }} />) },
                { name: 'Status', func: (inthis) => (<RxToggle value={inthis.state.editingData.is_active} onToggle={(newValue) => inthis.onBlurDataValue(newValue, 'is_active')} />) }
              ]} />
            </div>
          </div>
          <div className='clearfix-martop' />
        </div>
      </div>
    )
  }
}

export default [[RXNAME]]Component
