/* global translate */ 
import React, { Component } from 'react'
import { connect } from 'react-redux'

global.isclient && require('./rxSearchBox.css')
const { rxaget, rxChangeSlug, rxChangeSlugSearch , sortArrObj, stringToColour  ,changeColorSVG} = global.rootRequire('classes/ulti')
const { netaBlobsUpdate,chooseGroupAction, setComp, updateRecentSearchGroups, updateGroupsDraft, netaGroupsUpdate } = global.rootRequire('redux')
const { checkNameGroup, checkNameUser } = global.rootRequire('classes/chat')
const { rxgetLocal } = global.rootRequire('classes/request')
const rxio = global.rootRequire('classes/socket').default

class rxSearchBox extends React.PureComponent {
  constructor(props, context) {
    super(props, context)
    this.state = {
      groups: rxaget(this.props, 'groups', {}),
      groups_origin: rxaget(this.props, 'groups', {}),
      group_id: rxaget(this.props, 'rxgroup.groupid', ''),
      group: rxaget(this.props, 'rxgroup.group', {}),
      rxgroup: rxaget(this.props, 'rxgroup', {}),
      groupsNChatOrigin: rxaget(this.props, 'groupsNChatOrigin', {}),
      searchValue: '',
      groupsSearchArr: [],
      groupsSearchArrDisplay: [],
      groupsSearchBoxClickStatus: rxaget(this.props, 'groupsSearchBoxClickStatus', {}),
      checkSearchValue_IsNumeber: false,
      zgroup_contact_maxHeight: '224px',
      recentSearchGroups: [],
      recentContactGroups: []/*rxaget(this.props, 'groups', {})*/,
      arrPhoneContact: [],   
      arrPhoneContactDisplay: [],   
      countContact: 0,
      pageActive:rxaget(this.props, 'pageActive', ''),
    }
    
    this.netaContact = rxaget(this.props, 'netaContact.data', {}) || {}
    this.users = rxaget(this.props, 'user.users', {}) || {}
    this.token = rxaget(this.props, 'netaauth.user.token', '')
    this.userid = rxaget(this.props, 'netaauth.user.id', '')
    this.mouseClickFunction = this.mouseClickFunction.bind(this);
    this.state.recentSearchGroups = this.getRecentSearchGroups()

    this.messtyping = ''

    this.checkImage = {}
    const timenow = Math.floor(Date.now() / 1000)
    let checkImageObj = rxaget(this.props, 'netaBlobs.data', {}) || {}
    if (checkImageObj && typeof (checkImageObj) === "object" && Object.keys(checkImageObj).length > 0) {
      for (let keyImg of Object.keys(checkImageObj)) {
        let created_at = rxaget(checkImageObj[keyImg], 'created_at', 0)
        if ((timenow - created_at) < 43200) {
          this.checkImage[keyImg] = checkImageObj[keyImg]
        }
      }
    }

    let groups = this.props.groups
    let groupsTmp 
    if(groups) {
      groupsTmp = rxaget(this.props, 'groups', {}).filter(o => o.type === 3) 
    }else{
      try {
        const groupneta = rxaget(this.props, 'netaGroups', {})
        const arrContacts = []
        const arrGroups = []
        if (groupneta && groupneta.groups) {
          for (const idgroup of Object.keys(groupneta.groups)) {
            if (groupneta.groups[idgroup]) {
              let ogroup = groupneta.groups[idgroup]
              ogroup['group_fullname'] = checkNameGroup(ogroup, this.users, this.userid)
              if (ogroup && (ogroup.type === 3 || ogroup.type === 5) && !ogroup.avatar_url && rxaget(ogroup, 'occupants_uins', []).length === 2) {
                const arrUins = rxaget(ogroup, 'occupants_uins', [])
                ogroup['partner_id'] = (arrUins[0].toString() === this.userid.toString()) ? arrUins[1] : arrUins[0]
                if(ogroup.type === 3 ){
                  arrContacts.push(ogroup)  
                }                
              }
              arrGroups.push(ogroup)
            }
          }
        }
        groupsTmp = arrContacts
        this.state.groups = sortArrObj(arrGroups, 'last_message.created_at', 'desc')
      } catch (e) { console.log(e) }
    }
    

    let contactsUsers = this.props.groupsNChatOrigin
    if(!contactsUsers){
      contactsUsers = []
      if (this.users && Object.keys(this.users).length > 0) {
        for (const userid of Object.keys(this.users)) {
          if (userid !== this.userid) {
            contactsUsers.push(this.users[userid])
          }
        }
      }
    }  

    this.state.groupsNChatOrigin = contactsUsers

    ////
    let contactGroupsTmp = sortArrObj(groupsTmp, 'last_message.created_at', 'desc')
    this.state.recentContactGroups = contactGroupsTmp
    this.state.recentContactGroupsDisplay = contactGroupsTmp.slice(0,10)


  }

  componentDidMount() {

    this.setCursorSearchBox()
    document.addEventListener("click", this.mouseClickFunction, true);

  }
  UNSAFE_componentWillReceiveProps(nextProps) {
    
  }
  setCursorSearchBox() {
    let chatDiv = document.getElementById('zleft_search_place')
    if(chatDiv){      
      chatDiv.focus() 
      chatDiv.select()
    }     
  }

  componentWillUnmount() {    
    document.removeEventListener("click", this.mouseClickFunction, false);
    this.setState = (state,callback)=>{
      return;
    };
  }

  onClickAddContact(e){
    const pageActive = this.state.pageActive    
    if(pageActive === 'contactPage'){
      this.props.onClickAddContact()
    }
  }
  
  mouseClickFunction(event) {
    let groupsSearchBoxClickStatus = this.state.groupsSearchBoxClickStatus
    let searchValue = this.state.searchValue
    if(groupsSearchBoxClickStatus === true || searchValue.length > 0){
      let divNameClass = event.target.className
      let divClickFlag = false
      const divNameClassArr = [ 'zleft_search_place darkThemeInput',
                                'zleft_search_place lightThemeInput',
                                'icon32_white','new_chat','ava-span-1',
                                'pavith_nadal',
                                'zgroupitem-contact-rowline clearfix',
                                'ava-usergroup images-static',
                                'ava-span',
                                'zgroup_name',
                                'zgroup_name-contact',
                                'string-theme-color',
                                'zgroup_maininfo']
      if (divNameClassArr.indexOf(divNameClass) !== -1) {
        divClickFlag = true
      }
      if (divClickFlag === false) {
        // this.setState({ groupsSearchBoxClickStatus: false,searchValue:'' })
        this.props.searchBoxvalue(false,'')
        document.removeEventListener("click", this.mouseClickFunction, true);
      }
    }

  }

 
  getRecentSearchGroups() {
    try {
      const netaRecentSearchGroups = global.rxu.json(rxgetLocal('netaRecentSearchGroups'), {}) || {}
      const recentSearchGroupsArr = []
      let recentSearchGroups = []
      for (const idgroup of Object.keys(netaRecentSearchGroups.groups)) {
        if (netaRecentSearchGroups.groups[idgroup]) {
          let ogroup = netaRecentSearchGroups.groups[idgroup]
          ogroup['group_fullname'] = checkNameGroup(ogroup, this.users, this.userid)
          if (ogroup && (ogroup.type === 3 || ogroup.type === 5) && !ogroup.avatar_url && rxaget(ogroup, 'occupants_uins', []).length === 2) {
            const arrUins = rxaget(ogroup, 'occupants_uins', [])
            ogroup['partner_id'] = (arrUins[0].toString() === this.userid.toString()) ? arrUins[1] : arrUins[0]
          }
          recentSearchGroupsArr.push(ogroup)
        }
      }
      recentSearchGroups = sortArrObj(recentSearchGroupsArr, 'timeSearch', 'desc').slice(0,20)

      return recentSearchGroups
    } catch (e) { }
  }

  groupsSearchBoxClick() {
    if (this.state.searchValue.length === 0) {
      let recentSearchGroups = this.getRecentSearchGroups()
      this.props.searchBoxvalue(true,'')
      this.setState({
        groupsSearchBoxClickStatus: true,
        recentSearchGroups: recentSearchGroups
      })
    }
  }

  async onChangeSearch(e) {
    const _usersinfo = rxaget(global.rxu.json(rxgetLocal('rxusers'), {}), 'users')
    let value = e.target.value
    let groupsSearchBoxClickStatus
    let arrGroups = []
    let arrPhoneContact = []
    let arrPhoneContactId = []
    let isNumberStatus = false
    let zgroup_contact_maxHeight = '224px'

    // if (value.startsWith('0')) {
    //   value = value.replace(value.charAt(0), '+84')
    // }
    if (value.length >= 5 ) {
      groupsSearchBoxClickStatus = false
      for (let groupObj of this.state.groupsNChatOrigin) {
        let nameContact = checkNameUser(groupObj)
        if (rxaget(groupObj, 'id', '') !== this.userid) {
          if (!isNaN(value) && groupObj.phone.indexOf(value) !== -1) {
            if (groupObj.phone && this.netaContact[groupObj.phone]) {
              arrPhoneContact.push(groupObj)
            }  
            arrPhoneContactId.push(String(groupObj.id))
          }
          if (isNaN(value) && rxChangeSlugSearch(nameContact).indexOf(rxChangeSlugSearch(value)) !== -1) {
            if (groupObj.phone && this.netaContact[groupObj.phone]) {
              arrPhoneContact.push(groupObj)
            }
            arrPhoneContactId.push(String(groupObj.id))
          }
        }

      }
      arrGroups = this.state.groups.filter(o => {
        const userId = rxaget(o.occupants_uins.filter((id) => (id !== rxaget(this.props, 'netaauth.user.id'))), [0])
        const uname_info = rxaget(_usersinfo, [userId], translate('Stranger'))        
        try {
          if (o.group_fullname && rxChangeSlugSearch(o.group_fullname) && (rxChangeSlugSearch(o.group_fullname).indexOf(rxChangeSlugSearch(value)) !== -1 || (rxChangeSlugSearch(rxaget(uname_info, 'phone', '')).indexOf(rxChangeSlugSearch(value)) !== -1 && (o.type === 3)))) {            
            return true
          } else {
              for(let i = 0; i < o.occupants_uins.length; i++){
                if(arrPhoneContactId.indexOf(o.occupants_uins[i]) !== -1 ){
                  return true
                }
              }
            return false
          }
        } catch (e) {
          console.log(e)
        }
      })


    } else {
      groupsSearchBoxClickStatus = true
      arrGroups = this.state.groups.filter(o => rxChangeSlugSearch(o.group_fullname).indexOf(rxChangeSlugSearch(value)) !== -1)

    }
    if (!isNaN(value)) {
      isNumberStatus = true
      zgroup_contact_maxHeight = '100%'
    }

    if (arrPhoneContact.length === 0 && value.length >= 5) {
      let jsonUser = await this.searchPhone(value)
      if (jsonUser && rxaget(jsonUser, 'Id', '') !== this.userid) {
        arrPhoneContact.push(jsonUser)
      }
    }
    let arrPhoneContactDisplay = arrPhoneContact.slice(0,20)
    let arrSearchGroups = arrGroups.filter(o => o.type !== 3) 
    let groupsSearchArrDisplay = arrSearchGroups.slice(0,20)
    
    this.props.searchBoxvalue(groupsSearchBoxClickStatus,value)
    this.setState({
      groupsSearchArr: arrSearchGroups,
      groupsSearchArrDisplay: groupsSearchArrDisplay,
      searchValue: value,
      groupsSearchBoxClickStatus: groupsSearchBoxClickStatus,
      checkSearchValue_IsNumeber: isNumberStatus,
      zgroup_contact_maxHeight: zgroup_contact_maxHeight,
      arrPhoneContact: arrPhoneContact,
      arrPhoneContactDisplay: arrPhoneContactDisplay,
    })
  }

  handleTyping(text, flag) {
    this.messtyping = text
    setTimeout(() => {
      if (this.messtyping == text) {
        const api_get_phone = global.rxu.config.get_username
        let phoneRegx = /^\+?([0-9]{2})\)?[-. ]?([0-9]{4})[-. ]?([0-9]{4})$/
        if (!text.match(phoneRegx)) {
          
          fetch(api_get_phone + '?phone=' + text, {
            method: 'GET',
            headers: { Accept: 'application/json', 'TC-Token': this.token, Connection: 'Keep-Alive', 'Accept-Encoding': 'gzip' } 
          })
          .then((res) => { return res.json() })
          .then((json) => {
            if (json /*&& json.Id*/) {
              let arrContacts = []
                arrContacts = json 
              this.setState({
                arrPhoneContact: arrContacts,
                arrPhoneContactDisplay: arrContacts
              })
            }
          })
          .catch(er => console.log(er))
        }
      } 
    }, 1000)
  }

  async searchPhone(vPhone) {
    // vPhone = vPhone.replace("+", "")
    // let prefixes = ["0084", "084", "84", "0"]
    // for (let iChar in prefixes) {
    //   let jChar = prefixes.length - iChar
    //   let phoneSub = vPhone.substring(0, jChar)
    //   if (phoneSub === prefixes[iChar]) {
    //     vPhone = vPhone.replace(prefixes[iChar], "0")
    //     break
    //   }
    // }
    let phoneRegx = /^\+?([0-9]{2})\)?[-. ]?([0-9]{4})[-. ]?([0-9]{4})$/
    this.handleTyping(vPhone)
    if (vPhone.match(phoneRegx)) {
      const api_get_phone = global.rxu.config.get_phone
      const res = await fetch(api_get_phone + '?phone=' + vPhone, { method: 'GET', headers: { Accept: 'application/json', 'TC-Token': this.token, Connection: 'Keep-Alive', 'Accept-Encoding': 'gzip' }, body: null })
      try {
        let json = await res.json()
        if (json && json.Id) {
          return json
        } else {
          return null
        }
      } catch (e) {
        return null
      }
      console.log('Số điện thoại của bạn hợp lệ!')
    } else {
      return null
    }
  }

  chooseGroup(group) {
    this.props.searchBox_chooseGroup(group)
    this.props.searchBoxvalue(false,'')        
    this.setState({groupsSearchBoxClickStatus: false,searchValue:'' })
    let timeSeach = Date.now()
    this.props.updateRecentSearchGroups(group.group_id, group, timeSeach)
  }
  
  createNewChat(partner_id, newContact) {
    // let userOwner = rxaget(this.props, 'netaauth.user', {})
    // const params = {
    //   'type': 3,
    //   'owner_uin': userOwner.id,
    //   'name': '',
    //   'avatar_url': '',
    //   'occupants_uins': [userOwner.id,partner_id],
    //   'sender_name': userOwner.name
    // }
    
    // try {
    //   if (partner_id) {
    //     try {
    //       rxio.createNewGroup(params, (data) => {
    //         if (data && data.group) {
    //           if (data.group.type === 3) {
    //             data.group.partner_id = partner_id
    //           }
    //           this.props.chooseGroupAction(data.group)   
    //           this.chooseGroup(data.group)
    //           this.props.chooseContact()                     
    //         }
    //       })
    //     } catch(e1) {
    //     }
    //   }
    // } catch(e) {
    // }  

    let userid = this.userid.toString()
    partner_id = partner_id.toString()

    let params = {
      'type':3,
      'occupants_uins':[partner_id,this.userid.toString()]
    }

    let createdAt = new Date().getTime() * 1000 

    rxio.checkGroup(params,(data) => {
      let last_message = {
        'attachments': "",
        'created_at': createdAt
      }

      if(data && data.group) {
        let group = data.group
        let group_id = data.group.group_id
        
      
        if(!rxaget(this.props, 'netaGroups', {}).groups[group_id]){
          group.last_message = last_message
          group.isDraft = true
          
          let newnameuser = checkNameUser(newContact) || ''
          group['fullnamegroup'] = (newContact.full_name) ? newContact.full_name : (newnameuser) ? newnameuser : newContact.phone || ''
          group.group_fullname = group['fullnamegroup']
      
          this.props.updateGroupsDraft(group,group_id)
          this.props.netaGroupsUpdate(group.group_id, group)
          this.props.chooseGroupAction(group)
        }


      } else {
        let objGroup = JSON.parse(JSON.stringify({
          'admin_uins': [userid],
          'avatar_url': newContact.profile_url || '',
          'background': "",
          'blocked_uins': [],
          'count_unread': 0,
          'created_at': createdAt,
          'creator_uin': userid,
          'description': "",
          'group_fullname': (newContact.full_name) ? newContact.full_name : newContact.phone || '',
          'group_id': partner_id,
          'last_active_messages': [],
          'last_message': last_message,
          'last_message_id': "",
          'last_messages': [],
          'last_sos_messages': [],
          'locations': [],
          'mode': 0,
          'muted_uins': [],
          'name': "",
          'occupants_uins':[partner_id.toString(),this.userid.toString()],
          'owner_uin': userid,
          'partner_id': partner_id,
          'pinned_messages': [],
          'pinned_uins': [],
          'received_list': [],
          'removed_uins': [],
          'secrets': [],
          'seen_list': [],
          'status_list': [],
          'type': 3,
          'unread_cnt': 0,
          'updated_at': "",
          'isDraft': true
        }))

        let newnameuser = checkNameUser(newContact) || ''
        objGroup['fullnamegroup'] = (newContact.full_name) ? newContact.full_name : (newnameuser) ? newnameuser : newContact.phone || ''
        
        this.props.updateGroupsDraft(objGroup, partner_id)
        this.props.netaGroupsUpdate(objGroup.group_id, objGroup)
        this.props.chooseGroupAction(objGroup)
      }

                    
      this.props.setComp('chat')

    })
  }

  chooseContact(contact){
    if(this.state.pageActive==='contactPage'){
      this.props.setComp('chat')  
    }
    this.createNewChat(contact.id, contact)
    this.props.searchBoxvalue(false,'')
    // this.setState({groupsSearchBoxClickStatus: false,searchValue:'' })

  }

  createNewChatGroup(type_popup) {
   this.props.createNewChatGroup(type_popup)
  }
  disableDrop = event => {
    event.preventDefault();
  }
  scrollRecentContactList(e){
    const container = document.getElementById('csearch_recentContactList')

    if(container && (container.scrollLeft >= 300)){
      let groupsDisplay = this.state.recentContactGroupsDisplay      
      let index = groupsDisplay.length
      let groupsArr = this.state.recentContactGroups.slice(index,index + 10)

      groupsDisplay = [...groupsDisplay, ...groupsArr]
      this.setState({recentContactGroupsDisplay:groupsDisplay})      
    }
  }
  scrollPhoneContactList(e){
    const container = document.getElementById('csearch_phone_contact')

    if(container && (container.scrollTop + container.offsetHeight >= container.scrollHeight - 360)){
      let groupsDisplay = this.state.arrPhoneContactDisplay      
      let index = groupsDisplay.length
      let groupsArr = this.state.arrPhoneContact.slice(index,index + 20)

      groupsDisplay = [...groupsDisplay, ...groupsArr]
      this.setState({arrPhoneContactDisplay:groupsDisplay})      
    }
  }
  scrollgroupsSearchList(e){
    const container = document.getElementById('csearch_groupsSearch')

    if(container && (container.scrollTop + container.offsetHeight >= container.scrollHeight - 360)){
      let groupsDisplay = this.state.groupsSearchArrDisplay      
      let index = groupsDisplay.length
      let groupsArr = this.state.groupsSearchArr.slice(index,index + 20)

      groupsDisplay = [...groupsDisplay, ...groupsArr]
      this.setState({groupsSearchArrDisplay:groupsDisplay})      
    }
  }

  addColorToName(name){

    let result =''
    let searchValue = this.state.searchValue    
    
    RegExp.escape = function(s) {
      return s.replace(/[-\/\\^$*+?.()|[\]{}]/g, '\\$&');
    };
    
    if((searchValue.search(/[\[\]\\.?*+()]/) !== -1)){
      searchValue = new RegExp(RegExp.escape(searchValue), "i")
    }
    
    if(/*!(searchValue.search(/[\[\]\\.?*+()]/) !== -1) && */isNaN(searchValue)){
      let regEx = new RegExp(searchValue, "ig")
      let nameArr = name.split(regEx)
      if(name.match(regEx)){
        for(let i = 0; i < nameArr.length; i++){
          if(i === nameArr.length -1){
            result += nameArr[i]
          }else{
            let replaceValue = name.match(regEx)[i]
            result += nameArr[i] + `<span class = 'string-theme-color'>${replaceValue}</span>` //= name.replace(replaceValue, `<span class = 'string-theme-color'>${replaceValue}</span>`);  
          }        
        }  
      }else{
        result = name
      }
    }else{
      result = name
    }

    if (result && result.length < 60) {
      return result
    } else if (result.indexOf('string-theme-color') !== -1) {
      return (result.length < 105) ? result : result.slice(0, 105) + ' ...'
    } else {
      return result.slice(0, 60) + ' ...'
    }
  }
  render () {
    let recentContactGroupsDisplay = this.state.recentContactGroupsDisplay
    
    let searchBoxHeight = '100%'
    let searchBox_padding= '0px'
    if(this.state.groupsSearchBoxClickStatus === false && this.state.searchValue.length === 0 ){
      searchBoxHeight='0px'
      searchBox_padding='50px'
    }
    const linkava = global.rxu.config.get_avatar  
    return (
      <div className='search_contain' style={{height:searchBoxHeight,'paddingBottom':searchBox_padding}}>
        <div className='zleft_searchwrap'>
          <div className='icon_basic_search_area'>
            <img className='icon_basic_search filter_img_class'  src={changeColorSVG('./images/default/icons/search-active.svg')} alt=''/>
          </div>

          <input id ='zleft_search_place' type='search' maxLength='30' placeholder={translate('Search')} className={rxaget(this.props, 'themeBackgroudValue') === 'darkTheme' ? 'zleft_search_place darkThemeInput':'zleft_search_place lightThemeInput'}  onChange={e => { this.onChangeSearch(e) }} onClick={e => {this.groupsSearchBoxClick()}} onDrop={this.disableDrop}></input>

          <div className='dropdown'>
            <div className='zleft_edit' onClick={ e => {this.onClickAddContact(e)}} >
              <img className='icon32 filter_img_class' src={changeColorSVG('./images/default/icons/edit.svg')} alt=''/>
              <img className='icon32_white' src={changeColorSVG('./images/default/icons/edit40x40.svg')} alt=''/>
            </div>
            {(this.state.pageActive==='chatPage') &&
              <div className='dropdown-content'>
                <div className='rectangle_1827'>
                  <div className = 'dropdown-item' onClick={e => { this.createNewChatGroup('create_group') }}>
                    <img  className='filter_img_class' src={changeColorSVG('./images/default/icons/icon-basic-new-friend_group.svg')} alt=''/>
                    <span className='new_chat' >
                      {translate('New Group Chat')}
                    </span>
                  </div>
                </div>
                <div className='rectangle_1827'>
                  <div className = 'dropdown-item channel' onClick={e => { this.createNewChatGroup('create_channel') }}>
                    <img  className='filter_img_class' src={changeColorSVG('./images/default/icons/icon-basic-new-friend_group.svg')} alt=''/>
                    <span className='new_chat' >
                      {translate('New Channel')}
                    </span>
                  </div>
                </div>
              </div>
            }
          </div>

        </div>
        <div className={this.state.groupsSearchBoxClickStatus === true && recentContactGroupsDisplay && recentContactGroupsDisplay.length > 0 ? 'rectangle_1828':'rectangle_1828_hiden'}>
          <div className='searchbox-group-title'>
            {translate('Recent contact')} 
          </div>      
        </div>
        <div className={this.state.groupsSearchBoxClickStatus === true && recentContactGroupsDisplay && recentContactGroupsDisplay.length > 0 ? 'rectangle_1512':'rectangle_1512_hiden'}
            id = 'csearch_recentContactList'
            onScroll={e => this.scrollRecentContactList(e)}
        >
          <div  className='scrollmenu' >
            { recentContactGroupsDisplay && recentContactGroupsDisplay.length > 0 ?
              recentContactGroupsDisplay.map((ele, index) =>{
              return  <div className={'scrollmenu_item'} key={index} onClick={e => { this.chooseGroup(ele) }}>
                  <ul className='ul-item'>
                    <li className='li-item'>
                    <div className='menu_item' >
                      {ele.avatar_url 
                        ? 
                        <img src={global.rxu.config.get_static + ele.avatar_url} alt='avatar_url' className='ava-span-1'
                        onError={(e) => {e.target.onerror = null; e.target.src = './images/default/static/avadefault.svg' }} /> 
                        :
                        (this.users[ele.partner_id] && this.users[ele.partner_id]['profile_url'] 
                          ? <img src={`${global.rxu.config.cdn_endpoint}` + this.users[ele.partner_id]['profile_url']} alt='profile_url' data-id={'userava' + ele.partner_id} className='ava-span-1' 
                          onError={(e) => {e.target.onerror = null; e.target.src = './images/default/static/avadefault.svg' }}/> 
                           : this.checkImage[linkava + ele.partner_id] && <img src={this.checkImage[linkava + ele.partner_id]['link']} alt='linkava' className='ava-span-1' onError={(e) => {e.target.onerror = null; e.target.src = './images/default/static/avadefault.svg' }} />
                        )
                      }
                      {
                        !(ele.avatar_url || (this.users[ele.partner_id] && this.users[ele.partner_id]['profile_url']) )
                        &&<span className='ava-span-1' style={{ background: `linear-gradient(120deg, ${stringToColour('FFF' + rxaget(ele, 'group_id', '').slice(7,8) + rxaget(ele, 'group_fullname', '').slice(0, 1))}, #FFFFFF)` }}>
                          {rxChangeSlug(rxaget(ele, 'group_fullname', ''), true).slice(0, 2).toUpperCase()}
                        </span>  
                      }
                    </div>
                    </li>
                    <li >
                      <div className='pavith_nadal'>{rxaget(ele, 'group_fullname', '')}
                      </div>
                    </li>
                  </ul>
                </div>
              })
              :<div></div>
            }     
          </div>
        </div>
        <div className={this.state.groupsSearchBoxClickStatus === true  ? 'rectangle_1829':'rectangle_1829_hiden'}>
          <div className='searchbox-group-title'>
            {translate('Recent search')}
          </div>
        </div>
        { 
          this.state.arrPhoneContactDisplay.length > 0 && <div className={this.state.groupsSearchBoxClickStatus === false && this.state.searchValue.length > 0 && this.state.checkSearchValue_IsNumeber === false ? 'rectangle_1828':'rectangle_1828_hiden'}>
            <div className='searchbox-group-title'>
              {translate('CONTACT')} 
            </div>      
          </div>
        }
        <div className = {this.state.groupsSearchBoxClickStatus === false && this.state.searchValue.length > 0 ?  'rectangle_1512_contact':'rectangle_1512_hiden'} 
            style = {{'maxHeight':this.state.zgroup_contact_maxHeight}}
            id = 'csearch_phone_contact'
            onScroll={e => this.scrollPhoneContactList(e)}
        >
          { 
            this.state.arrPhoneContactDisplay.length > 0 &&
            this.state.arrPhoneContactDisplay.map((ele, index) => {
            let nameUserInfo = checkNameUser(ele)
            return <div className='zgroupitem-contact-rowline clearfix' key={index} onClick={e => { this.chooseContact(ele) }}>             
              <div className='zgroup_avatar-contact'>                      
                { (ele && ele.profile_url) ? 
                    <img src={`${global.rxu.config.cdn_endpoint}` + ele['profile_url']} alt='profile_url' className='ava-usergroup images-static' onError={(e) => {e.target.onerror = null; e.target.src = `./images/default/static/avadefault.svg` }} /> 
                  :
                    <span className='ava-span' style={{ background: `linear-gradient(120deg, ${stringToColour('FFF' + rxaget(ele, 'id', '').toString() + rxaget(ele, 'phone', '').toString())}, #FFFFFF)` }}> {rxChangeSlug(nameUserInfo, true).slice(0, 2).toUpperCase()} </span> 
                }
              </div>                
              
              <div className='zgroup_maininfo'>                                  
                <div className='zgroup_name-contact' dangerouslySetInnerHTML={{ __html: this.addColorToName(nameUserInfo) }}></div>
                {/*<div className='divider_area'></div>*/}
              </div>
            </div>
          })}
        </div>
        <div className={this.state.groupsSearchBoxClickStatus === false && this.state.searchValue.length > 0 && this.state.checkSearchValue_IsNumeber === false ? 'rectangle_1829':'rectangle_1829_hiden'}>
          <div className='searchbox-group-title'>
            {translate('GROUP')}
          </div>
        </div>
        <div className={this.state.groupsSearchBoxClickStatus === false && this.state.searchValue.length === 0 ?'searchbox_contactlist_hiden':'searchbox_contactlist'}             
            id = 'csearch_groupsSearch'
            onScroll={e => this.scrollgroupsSearchList(e)}
        >
          {this.state.groupsSearchBoxClickStatus === true && <div>
            { this.state.recentSearchGroups?
              this.state.recentSearchGroups.map((ele, index) =>{
                return(<div className='zgroupitem-contact-rowline clearfix' key={index} onClick={e => { this.chooseGroup(ele) }} >             
                  <div className='zgroup_avatar-contact'>                      
                    {ele.avatar_url 
                      ? 
                      <img src={global.rxu.config.get_static + ele.avatar_url} alt='avatar_url' className='ava-group images-static'
                      onError={(e) => {e.target.onerror = null; e.target.src = './images/default/static/avadefault.svg' }} /> 
                      :
                      (this.users[ele.partner_id] && this.users[ele.partner_id]['profile_url'] 
                        ? <img src={`${global.rxu.config.cdn_endpoint}` + this.users[ele.partner_id]['profile_url']} alt='profile_url' data-id={'userava' + ele.partner_id} className='ava-usergroup images-static' 
                        onError={(e) => {e.target.onerror = null; e.target.src = './images/default/static/avadefault.svg' }}/> 
                         : this.checkImage[linkava + ele.partner_id] && <img src={this.checkImage[linkava + ele.partner_id]['link']} alt='linkava' className='ava-usergroup images-static' onError={(e) => {e.target.onerror = null; e.target.src = './images/default/static/avadefault.svg' }} />
                      )
                    }
                    {
                      !(ele.avatar_url || (this.users[ele.partner_id] && this.users[ele.partner_id]['profile_url']) )
                      &&<span className='ava-span' style={{ background: `linear-gradient(120deg, ${stringToColour('FFF' + rxaget(ele, 'group_id', '').slice(7,8) + rxaget(ele, 'group_fullname', '').slice(0, 1))}, #FFFFFF)` }}>
                        {rxChangeSlug(rxaget(ele, 'group_fullname', ''), true).slice(0, 2).toUpperCase()}
                      </span>  
                    }
                  </div>                
                  <div className='zgroup_maininfo'>                                  
                    <div className='zgroup_name-contact'>{rxaget(ele, 'group_fullname', '')}</div>
                    {/*<div className='divider_area'></div>*/}
                  </div>
                </div>)
              })
              :<div></div>
            }          
          </div>}
          {this.state.groupsSearchBoxClickStatus === false && this.state.searchValue.length > 0 && this.state.checkSearchValue_IsNumeber === false && <div>
            { this.state.groupsSearchArrDisplay.length > 0 ? (
                this.state.groupsSearchArrDisplay.map((ele, index) =>{
                  return(<div className='zgroupitem-contact-rowline clearfix' key={index} onClick={e => { this.chooseGroup(ele) }} >             
                    <div className='zgroup_avatar-contact'>                      
                      {ele.avatar_url 
                        ? 
                        <img src={global.rxu.config.get_static + ele.avatar_url} alt='avatar_url' className='ava-group images-static'
                        onError={(e) => {e.target.onerror = null; e.target.src = './images/default/static/avadefault.svg' }} /> 
                        :
                        (this.users[ele.partner_id] && this.users[ele.partner_id]['profile_url'] 
                          ? <img src={`${global.rxu.config.cdn_endpoint}` + this.users[ele.partner_id]['profile_url']} alt='profile_url' data-id={'userava' + ele.partner_id} className='ava-usergroup images-static' 
                          onError={(e) => {e.target.onerror = null; e.target.src = './images/default/static/avadefault.svg' }} /> 
                           : this.checkImage[linkava + ele.partner_id] && <img src={this.checkImage[linkava + ele.partner_id]['link']} alt='linkava' className='ava-usergroup images-static' onError={(e) => {e.target.onerror = null; e.target.src = './images/default/static/avadefault.svg' }} />
                        )
                      }
                      {
                        !(ele.avatar_url || (this.users[ele.partner_id] && this.users[ele.partner_id]['profile_url']) )
                        &&<span className='ava-span' style={{ background: `linear-gradient(120deg, ${stringToColour('FFF' + rxaget(ele, 'group_id', '').slice(7,8) + rxaget(ele, 'group_fullname', '').slice(0, 1))}, #FFFFFF)` }}>
                          {rxChangeSlug(rxaget(ele, 'group_fullname', ''), true).slice(0, 2).toUpperCase()}
                        </span>  
                      }
                      

                    </div>                
                    
                    <div className='zgroup_maininfo'>                                  
                      <div className='zgroup_name-contact' dangerouslySetInnerHTML={{ __html: this.addColorToName(rxaget(ele, 'group_fullname', '')) }}></div>
                      {/*<div className='divider_area'></div>*/}
                    </div>
                  </div>)
                })
              ) : (
                <div>
                  {(this.state.arrPhoneContactDisplay && this.state.arrPhoneContactDisplay.constructor === Array && this.state.arrPhoneContactDisplay.length == 0) && <div className='zgroup-emty'>                
                    <div className='zgroup-emty_text' >

                    </div>
                  </div>}
                </div>
              )
            }
          </div>}
        </div>
      </div>
    )
  }
}

const mapStateToProps = (state, ownProps) => ({
  themeBackgroudValue: state.themeBackgroudValue,
  user: state.user,
  netaauth: state.netaauth,
  rxgroup: state.rxgroup,
  netaBlobs: state.netaBlobs,  
  netaGroups: state.netaGroups,
  netaContact: state.netaContact
})

const mapDispatchToProps = {
  netaBlobsUpdate,
  chooseGroupAction,
  setComp,
  updateRecentSearchGroups,
  updateGroupsDraft,
  netaGroupsUpdate

}

const rxSearchBox_ = connect(
  mapStateToProps,
  mapDispatchToProps
)(rxSearchBox)

export default rxSearchBox_