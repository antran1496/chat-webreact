import React, { Component } from 'react'

const { apiget, apipost } = global.rootRequire('classes/request')
const RxUpload = global.rootRequire('components/shares/rxUpload').default
const RxToggle = global.rootRequire('components/shares/rxToggle').default

const { AdminBlock } = global.rootRequire('components/shares/rxTemplates')

const WAIT_INTERVAL = 500
class ComponentInner extends Component {
  constructor (props, context) {
    super(props, context)
    this.onChangeContentCKE = this.onChangeContentCKE.bind(this)

    this.state = {
      flagUpdate: false,
      editingData: {},
      data: [],
      paging: { st_col: 'created_at', st_type: -1, pg_page: 1, pg_size: 10 },
      initdata: { desc: '', created_at: 1, is_deleted: 0, is_active: 1, is_hot: 0, price: 100000, app: '', appdist: '' }
    }
  }

  componentDidMount () {
    this.fetchData()
  }

  componentWillReceiveProps (nextProps) {
    if ([false, true].indexOf(nextProps.flagUpdate) !== -1 && nextProps.flagUpdate !== this.state.flagUpdate) {
      this.setState({ flagUpdate: nextProps.flagUpdate })
    }
  }

  fetchData () {
    apiget(global.rxu.config.api_cate, this.state.paging, { '1': (json) => { this.setState({ data: json.data }) } })
  }

  // C L I C K   E V E N T //
  onClickData (e, perdata) {}
  onClickSort (e, stcol) {
    let paging = this.state.paging
    this.setState({ paging: { ...paging, st_type: (paging.st_col !== stcol) ? -1 : (-1 * (paging.st_type)), st_col: stcol } }, () => { this.fetchData() })
  }

  onClickDataNew (e) {
    this.setState({ editingData: { ...this.state.initdata, name: 'Note_' + Date.now().toString() } })
  }

  onClickDataEdit (e, perdata) {
    this.setState({ editingData: JSON.parse(JSON.stringify(perdata)) })
  }

  onClickDataDelete (e, perdata) {
    apiget(global.rxu.config.api_cate + '/delete', perdata, { '1': (json) => { this.fetchData(true) } })
  }

  onClickDataRestore (e, perdata) {
    apiget(global.rxu.config.api_cate + '/restore', perdata, { '1': (json) => { this.fetchData(true) } })
  }

  onClickDataUpdateSubmit (e, perdata) {
    apipost(global.rxu.config.api_cate + '/edit', this.state.editingData, { '1': (json) => { this.fetchData(true) } }); this.onClickDataEdit({}, {})
  }

  onClickDataCreateSubmit (e, perdata) {
    apipost(global.rxu.config.api_cate, this.state.editingData, { '1': (json) => { this.fetchData(true) } }); this.onClickDataEdit({}, {})
  }

  onClickDataTrash (e, isdeleted) {
    this.setState({ ...this.state.paging, search_is_deleted: isdeleted }, () => { this.fetchData() })
  }

  // B L U R   E V E N T //
  onBlurData (e, name, options = {}) {
    let editingData = this.state.editingData
    this.setState({ editingData: { ...editingData, [name]: (options.strim) ? e.target.value.toString().replace(/(,)/g, '') : e.target.value } })
  }

  onBlurDataValue (value, name) {
    let editingData = this.state.editingData
    this.setState({ editingData: { ...editingData, [name]: value } })
  }

  onBlurDatafilter (e, name) {
    clearTimeout(this.timerDatafilter)
    this.setState({ paging: { ...this.state.paging, ['search_' + name]: e.target.value } })
    this.timerDatafilter = setTimeout((e, name) => { this.fetchData() }, WAIT_INTERVAL)
  }

  // P A G I N //
  onClickPagin (e, action) {
    let paging = this.state.paging
    if (action === 'Back') { paging.pg_page = (paging.pg_page > 1) ? (paging.pg_page - 1) : paging.pg_page } else { paging.pg_page += 1 }
    this.setState({ paging: paging }, () => { this.fetchData() })
  }

  onChangeContentCKE (evt) {
    this.setState({ editingData: { ...this.state.editingData, content: evt.editor.getData() } })
  }

  callbackUpload (e, name) {
    this.onBlurData({ target: { value: e.images } }, name)
  }

  // H E L P E R S //
  helpSortClass (stcol, extraclass) {
    extraclass = extraclass || []; extraclass = extraclass.join(' ')
    if (this.state.paging.st_col === stcol) { extraclass += this.state.paging.st_type === 1 ? ' rx-sort-asc' : ' rx-sort-desc' }
    return extraclass
  }

  renderForm () {
    let tempform = this.props.form || [
      { name: 'Picture', func: () => (<RxUpload callback={(e) => this.callbackUpload(e, 'img_landscape')} images={this.state.editingData.img_landscape} />) },
      { name: 'Name', func: () => (<input tabIndex='1' type='text' value={this.state.editingData.name} onChange={(e) => this.onBlurData(e, 'name')} className='fullwidth-input' />) },
      { name: 'Desc', func: () => (<input tabIndex='2' type='text' value={this.state.editingData.desc} onChange={(e) => this.onBlurData(e, 'desc')} className='fullwidth-input' />) },
      { name: 'Status', func: () => (<RxToggle value={this.state.editingData.is_active} onToggle={(newValue) => this.onBlurDataValue(newValue, 'is_active')} />) } ]

    if (this.state.editingData.created_at && tempform) {
      let form = tempform.map((perdata, index) => (<div key={index}><div className='fullwidth-label'>{perdata.name}</div>{perdata.func(this)}</div>))
      return form
    }
  }

  renderHead () {
    return (<tr>
      <th className='rxwidth--100'>Picture</th>
      <th className={this.helpSortClass('name', ['rxwidth--220'])} onClick={(e) => this.onClickSort(e, 'name')}>Name</th>
      <th className={this.helpSortClass('created_at', ['rxwidth--150'])} onClick={(e) => this.onClickSort(e, 'created_at')}>Created at</th>
      <th className='rxwidth--100'>Action</th>
    </tr>)
  }

  renderBody () {
    return this.state.data.map(perdata => (<tr key={perdata._id}>
      <td><img className='betable__img' alt={perdata.name} src={global.rxu.config.base_api + '/upload/image/' + (perdata.img_landscape || 'ico_app_default.jpg')} /></td>
      <td>{perdata.name}</td>
      <td><small>{global.rxu.date(perdata.created_at)}</small></td>
      <td>
        { this.state.paging.search_is_deleted !== 1 &&
          <div> {(perdata.is_hot) && <span className='betable__icohot'><span className='icon-fire' />Hot</span>}
            {(perdata.is_active !== 0) && <span className='betable__icoon'>On</span>}{(perdata.is_active === 0) && <span className='betable__icooff'>Off</span>}
            <span className='betable__btnedit' onClick={(e) => this.onClickDataEdit(e, perdata)}><i className='icon-pencil' /></span>
            <span className='betable__btndelete' onClick={(e) => this.onClickDataDelete(e, perdata)}><i className='icon-close' /></span></div> }
        { this.state.paging.search_is_deleted === 1 &&
          <div> <span className='betable__restore' onClick={(e) => this.onClickDataRestore(e, perdata)}>Restore</span></div>}
      </td>
    </tr>))
  }

  render () {
    return (
      <AdminBlock name='Note' desc='Manage Note'>
        <div className='rxcol-100'>
          <div className='betable'>
            <span className='betable__filter'>
              <div className='betable__btns clearfix'>
                <span className='betable__btnadd btn' onClick={(e) => this.onClickDataNew(e)}><i className='icon-plus betable__addbtn' />Tạo mới</span>
                { this.state.paging.search_is_deleted !== 1 && <span className='btn--default' onClick={(e) => this.onClickDataTrash(e, 1)} ><i className='icon-trash betable__recycle' /></span> }
                { this.state.paging.search_is_deleted === 1 && <span className='btn--default' onClick={(e) => this.onClickDataTrash(e, 0)} ><i className='icon-list betable__recycle' /></span> }
              </div>
              <input className='betable__findinput' type='text' placeholder='Tìm kiếm' onKeyUp={(e) => this.onBlurDatafilter(e, 'name')} />
            </span>

            <div className='betable__pagin'>
              {(this.state.paging.pg_page !== 1) && <div className='betable__paginback' onClick={(e) => this.onClickPagin(e, 'Back')}><i className='icon-arrow-left' /></div>}
              <div className='betable__pagincurr'>{this.state.paging.pg_page}</div>
              {(this.state.data.length >= this.state.paging.pg_size) && <div className='betable__paginnext' onClick={(e) => this.onClickPagin(e)}><i className='icon-arrow-right' /></div>}
            </div>

            <div className='betable__main'>
              <table className='betable__inner'>
                <thead>{this.renderHead()}</thead>
                <tbody>{this.renderBody()}</tbody>
              </table>
            </div>

            <div className='betable__pagin betable__pagin--bot'>
              {(this.state.paging.pg_page !== 1) && <div className='betable__paginback' onClick={(e) => this.onClickPagin(e, 'Back')}><i className='icon-arrow-left' /></div>}
              <div className='betable__pagincurr'>{this.state.paging.pg_page}</div>
              {(this.state.data.length >= this.state.paging.pg_size) && <div className='betable__paginnext' onClick={(e) => this.onClickPagin(e)}><i className='icon-arrow-right' /></div>}
            </div>
          </div>
          { this.state.editingData.created_at && <div className='adform'>
            <div className='adform__name'>Edit object <b>{this.state.editingData.name}</b><div className='adform__close' onClick={(e) => this.onClickDataEdit(e, {})}>x</div></div>
            <div className='adform__body'>
              {this.renderForm()}
              <div className='adform__btns'>
                <a tabIndex='10' className='adform__btncancel' onClick={(e) => this.onClickDataEdit(e, {})} onKeyPress={(e) => this.onClickDataEdit(e, {})}>Back</a>
                {this.state.editingData.created_at !== 1 && <a tabIndex='11' className='adform__btnedit' onClick={(e) => this.onClickDataUpdateSubmit(e)} onKeyPress={(e) => this.onClickDataUpdateSubmit(e)}>Update</a>}
                <a tabIndex='12' className='adform__btnclone' onClick={(e) => this.onClickDataCreateSubmit(e)} onKeyPress={(e) => this.onClickDataCreateSubmit(e)}>Clone</a>
              </div>
            </div>
          </div> }
        </div>
        <div className='clearfix-martop' />
      </AdminBlock>
    )
  }
}

export default ComponentInner
