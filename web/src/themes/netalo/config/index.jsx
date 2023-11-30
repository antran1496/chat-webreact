/* global translate */ 
import React from 'react'
import Parser from 'html-react-parser'
global.isclient && require('./index.css')
const { rxChangeSlug,rxconfig,stringToColour,subString ,changeColorSVG} = global.rootRequire('classes/ulti')
const {checkNameContact, checkNameUser }= global.rootRequire('classes/chat')
let zget = global.rxu.get
let adminCSS = '<style>.main-container{ width: 100% !important; padding: 0px !important; } .homenav, .footer{ display: none !important; }</style>'
let appName = 'GAlo'
let appSupportUrl = 'https://hotro.galo.vn'
if (rxconfig.theme === 'default') {
  appName = 'NetAlo'
  appSupportUrl = 'https://hotro.netalo.vn'
}
export const renderBody = (vm) => <div>
  <div className='zchat_left'>
    <div className='zleft_menu'>
      <div className='zmenu_message' onClick={e => {vm.props.setComp('chat'); vm.zmenu_logoutConfigpage()}}>
        <img src={changeColorSVG('./images/default/icons/chat.svg')} className='zmenu_icon icon' alt='' />
      </div>
      <div className='zmenu_call' onClick={e => { vm.props.setComp('call');vm.zmenu_logoutConfigpage()}}>
        <img src={changeColorSVG('./images/default/icons/call.svg')} className='zmenu_icon icon' alt='' />
      </div>
      <div className='zmenu_contact' onClick={e => {vm.props.setComp('contact'); vm.zmenu_logoutConfigpage()}}>
        <img src={changeColorSVG('./images/default/icons/contact.svg')} className='zmenu_icon icon' alt='' />
      </div>
      <div className='zmenu_config' onClick={e => { vm.zmenu_logoutConfigpage()}}>
        <img src={changeColorSVG('./images/default/icons/config-active.svg') }className='zmenu_icon icon filter_img_class' alt='' />
      </div>
    </div>
    <div className='zleft_contain'>
      <div className='zuinfo_base'>
        <div className='zuinfo_header'>
          <span className='zuinfo_header-title'>
            {translate('Account')}
          </span>
          <div className='zuinfo_header-btn_edit' onClick={e=>vm.editBtnClick()}>
            {/*{<span className='zuinfo_header-txt_edit'>
              {translate('Edit')}
            </span>}*/}
          </div>
        </div>
        <div className='zuinfo_avatar'>
          {(zget(vm.userinfo, 'profile_url', '') || vm.state.netaauth_profile_url) && <img className='zuinfo_avatar_img images-static'
            src={`${global.rxu.config.cdn_endpoint}${(vm.state.netaauth_profile_url || zget(vm.userinfo, 'profile_url', ''))}`} alt=''
            onError={(e) => { 
              e.target.onerror = null; 
              e.target.src = './images/default/static/noimagedefault.svg' }} />
          }
          {/*<span className='zspan_nameuser_default'>
            {{rxChangeSlug(vm.state.netaauth_user_name).slice(0, 2).toUpperCase()}}
          </span>*/}
          <div className='zuinfo_edit_avatar' onClick={(e) => vm.uploadInputImage.click() }>
            <input type='file' id='data_image' ref={(ref) => { vm.uploadInputImage = ref}} multiple={false} key={'data_image'}
              style={{ display: 'none' }} accept="image/jpg,image/png,video/mp4"
              onChange={(e) => vm.uploadFileImages(e.target.files)} />
            <div className="icon-camera"></div>
            {(zget(vm.userinfo, 'profile_url', '') || vm.state.netaauth_profile_url)
              && <img className='zuinfo_avatar_img images-static'
                alt=''
                src={`${global.rxu.config.cdn_endpoint}${vm.state.netaauth_profile_url || zget(vm.userinfo, 'profile_url', '')}`}
                onError={(e) => {
                  e.target.onerror = null;
                  e.target.src = './images/default/static/noimagedefault.svg'
                }} />}
             <span className='chatConfig_zspan_avanameuser_default'>
                {rxChangeSlug(vm.state.netaauth_user_name).slice(0, 2).toUpperCase()}
              </span>
          </div>
        </div>
        <div className='zuinfo_info'>
          <div className='zuinfo_name'>{vm.state.netaauth_user_name}</div>
          <div className='zuinfo_desc'>{zget(vm.props, 'netaauth.user.phone')}</div>
        </div>
        <div className='zuitems'>
          <div className='zuitem zuitem_general '>
            <img className='icon24' src={changeColorSVG('./images/default/icons/notify.svg')} alt='' />
            <span className='zuinfo_txt'>
              {translate('General settings')}
            </span>
            <img className='icon24 zuitem-right' src={changeColorSVG('./images/default/icons/right-arrow.svg')} alt='' />
          </div>  
          <div className= 'zuitem zuitem_notify'
            onClick={e => {  vm.setState({ displayListBlock: true }) }}>
            <img className='icon24 filter_img_class' src={changeColorSVG('./images/default/icons/ic_block_list.svg')} alt='' />
            <span className='zuinfo_txt'>
              {translate('Block list')}
            </span>
            <img className='icon24 zuitem-right' src={changeColorSVG('./images/default/icons/right-arrow.svg')} alt='' />
          </div>

          <div className={zget(vm.props, 'pageValue')==='cdtb'?'zuitem-active zuitem_notify ':'zuitem zuitem_notify'} onClick={e => { vm.choose_cdtb('cdtb')}}>
            <img className='icon24 filter_img_class' src={changeColorSVG('./images/default/icons/notify.svg')} alt='' />
            <span className='zuinfo_txt'>
              {translate('Notification settings')}
            </span>
            <img className='icon24 zuitem-right' src={changeColorSVG('./images/default/icons/right-arrow.svg')} alt='' />
          </div>    
          <div className={(zget(vm.props, 'pageValue') === 'cdcd') || (vm.state.page === 'cdcd')?'zuitem-active zuitem_notify ':'zuitem zuitem_notify '} onClick={e => { vm.choose_cdcd('cdcd')}}>
            <img className='icon24 filter_img_class' src={changeColorSVG('./images/default/icons/theme.svg')} alt='' />
            <span className='zuinfo_txt'>
              {translate('Theme')}
            </span>
            <img className='icon24 zuitem-right' src={changeColorSVG('./images/default/icons/right-arrow.svg')} alt='' />
          </div>
          <div className={zget(vm.props, 'pageValue')==='cdnn'?'zuitem-active zuitem_lang ':'zuitem zuitem_lang'} onClick={e => { vm.choose_cdnn('cdnn')}}>
            <img className='icon24 filter_img_class' src={changeColorSVG('./images/default/icons/language.svg')} alt='' />
            <span className='zuinfo_txt'>
              {translate('Language')}
            </span>
            <div className='zuitem-right'>
              <span className='zuinfo-txtmore'>
                {zget(vm.props, 'langValue')==='en'?'English':'Tiếng Việt'}
              </span>
              <img className='icon24 ' src={changeColorSVG('./images/default/icons/right-arrow.svg')} alt='' />
            </div>
          </div>
          <div className={zget(vm.props, 'pageValue')==='chtg'?'zuitem-active zuitem_lang ':'zuitem zuitem_lang'} onClick={e => { vm.choose_chtg('chtg')}}>
            <img className='icon24 filter_img_class' alt='' src={changeColorSVG('./images/default/icons/question.svg')} />
            <span className='zuinfo_txt'>
              {translate('Frequently asked questions')}
            </span>
            <img className='icon24 zuitem-right' src={changeColorSVG('./images/default/icons/right-arrow.svg')} alt='' />
          </div>
          <div className={zget(vm.props, 'pageValue')==='dksd'?'zuitem-active zuitem_lang ':'zuitem zuitem_lang'} onClick={e => { vm.choose_dksd('dksd')}}>
            <img className='icon24 filter_img_class' alt='' src={changeColorSVG('./images/default/icons/rule.svg')} />
            <span className='zuinfo_txt'>
              {translate('Terms of use')}
            </span>
            <img className='icon24 zuitem-right' src={changeColorSVG('./images/default/icons/right-arrow.svg')} alt='' />
          </div>
          <div className='zuitem zuitem_lang' onClick={vm.onClickLogout.bind(vm)}>
            <div className='icon-logout zicon-logout' />
            <span className='zuinfo_txt'>
            {translate('Logout')}
            </span>
          </div>
        </div>
        <div className='zuversion'>Version: 1.0.14</div>
      </div>
    </div>

    {vm.state.displayListBlock === true && <div className="newgroup_rectangle config">
      <div className="newgroup_rectangle_1"></div>
      {/* <div className="newgroup_rectangle_2_1"> */}
      <div className="create_new_group_chat">
        <div className="newgroup_rectangle_title">
          <div className="them_lien_he">{translate("Block list")}</div>
          <div className="close_icon" onClick={e => { vm.setState({ displayListBlock: false,unblockList:{} }) }}>
            <img
              className="icon-basic-up filter_img_class"
              src={changeColorSVG('./images/default/icons/icon-basic-up.svg')}
              alt=""
            />
          </div>
        </div>
        <div className="newgroup_body">
          <div className="newgroup_contactlist_default" id="zgroup_list">
            {vm.state.blockedList ?
              (vm.state.blockedList.length ? vm.state.blockedList.map((ele, index) => {
                return (
                  <div key={index}
                    className="zgroupitem-contact clearfix"  >
                    <div className="zgroup_avatar">
                      {ele.profile_url && (
                        <img src={global.rxu.config.cdn_endpoint + ele.profile_url}
                          alt="" data-id={"userava" + ele.id} className="ava-useravatar images-static"
                          onError={e => {
                            e.target.onerror = null; e.target.src = global.rxu.config.get_static + ele.profile_url
                          }}
                        />
                      )}
                      {!ele.profile_url && <span className="ava-span"
                        style={{
                          background: `linear-gradient(120deg, ${stringToColour("FFF" + checkNameContact(ele).slice(0, 2).toUpperCase())}, #FFFFFF)`
                        }}
                      >
                        {rxChangeSlug(checkNameUser(ele)).slice(0, 2).toUpperCase()}
                      </span>}
                      
                    </div>
                    <div className="zgroup_maininfo-contact" >
                      <div className="newgroup_userinfo_place" onClick={e => vm.onChooseContactUnblock(ele, index)}> {subString(checkNameUser(ele), 20)} </div>
                      <div className="newgroup_checked">
                        <label className="container100">
                          <input
                            className="checkmark1"
                            type="checkbox"
                            checked={vm.state.unblockList[ele.group_id] ? true : false}
                            onChange={e => vm.onChooseContactUnblock(ele, index)}
                          />
                          <span className="checkmark" ></span>
                        </label>
                      </div>
                    </div>
                    <div className="newgroup_divider"></div>
                  </div>
                );
              }) : <div className='mess-unblock'>{translate('You haven\'t blocked any contact')}</div>) :
              <div className="loading"><div className="dot-flashing"></div></div>}

          </div>
        </div>
        {(vm.state.blockedList && vm.state.blockedList.length)?<div className="newgroup-buntton">
          <span className="newgroup-create-btn" onClick={e => vm.onClickUnBlockContact()}>
            {translate("Unblock contact")}
          </span>
        </div>:null}
      </div>
    </div>}
    <div className={(vm.state.displayEditScreen === true) ? 'chatConfig_rectangle' : 'chatConfig_rectangle_hiden'}>          
      <div className='chatConfig_rectangle_1'></div>        
      <div className='chatConfig_rectangle_2'>        
        <div className='chatConfig_rectangle_2_1'>
          <div className='chatConfig_title_place'>
            <div className='chatConfig_cancel_btn' onClick={e=>vm.cancelBtnClick()}>{translate('Cancel')}</div>
            <div className='chatConfig_title'>{translate('Profile')}</div>
          </div>
          <div className='chatConfig_avatar_place'>
            <div className='zuinfo_edit_avatar' onClick={(e) => vm.uploadInputImage.click() }>
              <input type='file' id='data_image' ref={(ref) => { vm.uploadInputImage = ref}} multiple={false} key={'data_image'}
                style={{ display: 'none' }} accept="image/jpg,image/png,video/mp4"
                onChange={(e) => vm.uploadFileImages(e.target.files)} />
              <div className="icon-camera"></div>
              {(zget(vm.userinfo, 'profile_url', '') || vm.state.netaauth_profile_url)
                && <img className='zuinfo_avatar_img images-static'
                      alt=''
                      src={`${global.rxu.config.cdn_endpoint}${vm.state.netaauth_profile_url || zget(vm.userinfo, 'profile_url', '')}`}
                      onError={(e) => { 
                        e.target.onerror = null; 
                        e.target.src = './images/default/static/noimagedefault.svg' 
                      }} 
                   />}
               <span className='chatConfig_zspan_nameuser_default'>
                  {rxChangeSlug(vm.state.netaauth_user_name).slice(0, 2).toUpperCase()}
                </span>
            </div>
          </div>
          <div className='chatConfig_edit_body'>
            <div className='chatConfig_edit_tile'>{translate('Full name')}</div>
            <div className='chatConfig_group_input_place'>
              <input maxLength="30" className='chatConfig_input' placeholder={vm.state.netaauth_user_name}
              value={vm.state.usernameValue} 
              onChange={(event) =>vm.setState({ usernameValue: event.target.value })} ></input>   
              <div className='chatConfig_border_bot'></div>
            </div>
            <div className='chatConfig_edit_tile'>{translate('Phone number')}</div>
            <div className='chatConfig_group_input_place'>
              <div className='chatConfig_phone_input_place'>
                <span className='chatConfig_phone' >{zget(vm.props, 'netaauth.user.phone')}</span> 
              </div>
              <div className='chatConfig_phone_lock_icon'>
                {/*<img src={zget(vm.props,'themeValue') ==='blueColor'?'./images/icons/Mask Group 109_bl.png':'./images/icons/Mask Group 109.png')} alt=''/>*/}
              </div> 
              <div className='chatConfig_border_bot'></div>               
            </div>             
            <div className='chatConfig_note'>{translate('Registered phone number cannot be changed')}</div>
            <div className='chatConfig_doneBtn' onClick={()=>vm.updateProfile()}>{translate('Done')}</div>
          </div>          
        </div>      
      </div>        
    </div> 
  </div>
  <div className='zchat_right'>
    <div className={zget(vm.props, 'pageValue')==='cdtb' ? 'zchat_right_cdtb' : 'zchat_right_cdtb_hiden'}>
      <div className='cdcd_main_title_place'>
        <div className ='cdcd_main_title'>
          {translate('Notification settings')}
        </div>
      </div>
      <div className='cdtb_rowplace' >
        <div className ='cdtb_title'>
          {translate('Allows notifications')}
        </div>
        <div className='cdtb_pt_place'>
          <label className='switch'>
            <input className = 'pushToggles' type = 'checkbox' checked = {vm.state.notificationStatusValue} onChange={e=>vm.usePushNotifications(e)}/>
            <span className = 'slider round'></span>
          </label>
        </div>  
      </div>
    </div>
    <div className={(zget(vm.props, 'pageValue') === 'cdcd') || (vm.state.page === 'cdcd')? 'zchat_right_cdcd' : 'zchat_right_cdcd_hiden'}>
      <div className='cdcd_main_title_place'>
        <div className ='cdcd_main_title'>
          {translate('Theme settings')}
        </div>
      </div>   
      <div className='cdcd_body'>
        <div className = 'cdcd_title'>{translate('Theme')}</div>
        <div className='cdcd_hh'>
          <div className='cdcd_hh_left'>
            <div className='cdcd_hh_place'>    
              <div className={(zget(vm.props,'themeBackgroudValue') !== 'darkTheme') ? 'cdmd cdcd_border_active' : 'cdmd cdcd_border'} onClick={e=>vm.themeSelect('defaultTheme')}>
                <div className='cdmd_row1_place'>
                  <div className='cdmd_row1_img'></div>
                </div>
                <div className='cdmd_row2_place'>
                  <div className='cdmd_row2_img'></div>
                </div>
              </div>        
            </div>
            <div className='cdcd_background_place'>
              {translate('Default')}
            </div>
          </div>
          <div className='cdcd_hh_right'>
            <div className='cdcd_hh_place'>   
              <div className={(zget(vm.props,'themeBackgroudValue') === 'darkTheme') ? 'cdbd cdcd_border_active' : 'cdbd cdcd_border'}onClick={e=>vm.themeSelect('darkTheme')}>
                <div className='cdbd_row1_place'>
                  <div className='cdbd_row1_img'></div>
                </div>
                <div className='cdbd_row2_place'>
                  <div className='cdbd_row2_img'></div>
                </div>
              </div>           
            </div>
            <div className='cdcd_background_place'>
              {translate('Night')}
            </div>
          </div>        
        </div>
        <div className='cdcd_rowplace_border_top'></div>
        <div className={rxconfig.theme === 'galo' ?'cdcd_rowplace_hiden':'cdcd_rowplace'}>
          <div className='cdcd_rowplace_title'> 
            {translate('Color')}
          </div>
          <div className='cdcd_rdbtn_place'>
            <div className='cdcd_border1' >
              <label className='cdcd_container'>
                <input type='radio' name='radio' defaultChecked={(zget(vm.props,'themeValue') !== 'blueColor')} />
                <span className='cdcd_checkmark1' onClick={e=>vm.submitThemeColor('orangeColor')}></span>
              </label>
            </div>
          </div>
          <div className='cdcd_rdbtn_place'>
            <div className='cdcd_border2' >
              <label className='cdcd_container'>
                <input type='radio' name='radio' defaultChecked={zget(vm.props,'themeValue') ==='blueColor'?'checked':''} />
                <span className='cdcd_checkmark2' onClick={e=>vm.submitThemeColor('blueColor')}></span>
              </label>
            </div>  
          </div>
          
        </div>
      </div> 
    </div>
    <div className={zget(vm.props, 'pageValue')==='cdnn' ? 'zchat_right_cdnn' : 'zchat_right_cdnn_hiden'}>
      <div className='cdnn_main_title_place'>
        <div className ='cdnn_main_title'>
          {translate('Language settings')}
        </div>
      </div>
      <div className='cdnn_rowplace'>
        <div className='cdnn_title'>
          {translate('Language')}
        </div>
        <div className='cdnn_selectBox'>
          <select className='cdnn_language_place' id='cdnn_language' onChange={e=>{vm.changeLang(e.target.value)}}>
            {zget(vm.props,'langValue')==='vi'?<option value='vi' selected>Tiếng Việt</option>:<option value='vi' >Tiếng Việt</option>}
            {zget(vm.props,'langValue')==='en'?<option value='en' selected>Enghlish</option>:<option value='en' >Enghlish</option>}
          </select>    
        </div>
        
      </div>
      <div className='cdnn_divider_area'>
        <div className='cdnn_divider'></div>
      </div>  
    </div>
    <div className={zget(vm.props, 'pageValue')==='chtg' ? 'zchat_right_chtg' : 'zchat_right_chtg_hiden'}>
      {/*<div className='chtg_config_title'>
        <div className='chtg_config_title_border_bot'>{translate('Have Questions? Look Here')}</div>
      </div>*/}
      <div className='chtg_body'>   
        { (zget(vm.props, 'langValue') === 'en') && <iframe src="https://betaweb.netalo.vn/netalo/support/en/FAQs.html" style={{position:'absolute', top:'0px', width:'100%', height:'100vh'}}></iframe>}
        { (zget(vm.props, 'langValue') !== 'en') && <iframe src="https://betaweb.netalo.vn/netalo/support/vn/FAQs.html" style={{position:'absolute', top:'0px', width:'100%', height:'100vh'}}></iframe>}
      {/*{vm.state.arrQuestion.map((ele, index) =>{
        return <div key={index}>
          <div className='chtg_quest'>     
            <div className='chtg_quest_place' onClick={e=>{vm.chtg_clickTitle(ele.name)}}>
              <div className='chtg_quest_title'>{translate(ele.question)}</div>
              <div className='chtg_quest_img'>
                {<i className={ele.status_click === true ? 'arrow up' : 'arrow down'}></i> }
              </div>
            </div>
            <div className='chtg_quest_border_bot'></div>
            <div className={ele.status_click === true ? 'chtg_answer' : 'chtg_answer_hiden'}>
              <div className='chtg_answer_info'>{translate(ele.answer)}</div>
            </div>
          </div>
        </div>
        }
      )}*/}

      </div>
      <div className = 'chtg_footer'></div>
    </div>
    <div className={zget(vm.props, 'pageValue')==='dksd' ? 'zchat_right_dksd' : 'zchat_right_dksd_hiden'}>

      { (zget(vm.props, 'langValue') === 'en') && <iframe src="https://betaweb.netalo.vn/netalo/support/en/term.html" style={{position:'absolute', top:'0px', width:'100%', height:'100vh', padding: '0px 20px 50px 20px'}}></iframe>}
      { (zget(vm.props, 'langValue') !== 'en') && <iframe src="https://betaweb.netalo.vn/netalo/support/vn/term.html" style={{position:'absolute', top:'0px', width:'100%', height:'100vh', padding: '0px 20px 50px 20px'}}></iframe>}

      {/*<div className='dksd_config_title'>
        <div> {translate('Terms Of Service')}</div>
        <div className='dksd_divider'></div>
      </div>

      <div className={zget(vm.props, 'langValue')==='en'?'dksd_body_hiden':'dksd_body'}>
        <span>
          Bằng việc đăng ký sử dụng dịch vụ của NetAlo (sau đây gọi tắt là "dịch vụ") hay các dịch vụ trên các tên miền phụ của NetAlo, bạn được hiểu là đồng ý với các điều khoản và điều kiện dưới đây (gọi tắt là "điều khoản dịch vụ"). Các tính năng hoặc ứng dụng của NetAlo cũng tuân thủ theo điều khoản dịch vụ này. Bạn có thể xem lại bản điều khoản dịch vụ mới nhất bất kì lúc nào tại đây. NetAlo có quyền hạn và nghĩa vụ cập nhật tất cả những thông tin thay đổi về điều khoản dịch vụ tại trang web chính của NetAlo. Điều khoản này sẽ được dẫn chiếu trong hợp đồng dịch vụ của NetAlo và có giá trị pháp lý trong trường hợp tranh chấp. Chúng tôi đề xuất bạn nên kiểm tra và quay lại đây đọc các điều khoản dịch vụ để biết được những thay đổi mới và có thể ảnh hưởng tới bạn. Nếu bạn có bất kì thắc mắc hay góp ý nào về điều khoản dịch vụ của NetAlo, vui lòng liên hệ với chúng tôi để được làm rõ. Nếu bạn có phản đối với bất kì điều khoản hay điều kiện nào, vui lòng không sử dụng dịch vụ của NetAlo để tránh khỏi những ràng buộc và tranh chấp có thể phát sinh.
        </span>
        <br />
        <span>Bạn cần đọc và đồng ý với toàn bộ điều khoản dịch vụ dưới đây trước khi sử dụng dịch vụ của NetAlo.</span><br /><br /><br />

        <div className="content__term--header">I. Điều khoản về tài khoản người sử dụng</div>
        <span>1. Bạn phải lớn hơn 18 tuổi để sử dụng dịch vụ của NetAlo. Trong suốt quá trình sử dụng, bạn cần đảm bảo đủ điều kiện sử dụng dịch vụ của NetAlo trước pháp luật.</span><br />
        <span>2. Bạn phải cung cấp đầy đủ họ và tên, số điện thoại và email chính xác cùng những thông tin liên quan cần thiết để được hưởng đầy đủ chính sách hỗ trợ người dùng của NetAlo.</span><br />
        <span>3. Bạn cần biết rằng NetAlo sẽ sử dụng email và/hoặc số điện thoại của bạn như là một phương pháp giao tiếp chính giữa hai bên.</span><br />
        <span>4. Bạn có nghĩa vụ phải bảo vệ mật khẩu đăng nhập của chính mình. NetAlo không cam kết bồi thường bất kì thiệt hại nào cho người dùng nếu như việc đó xuất phát từ việc bạn không bảo mật cho mật khẩu đăng nhập của chính mình.</span><br />
        <span>5. Bạn chịu toàn bộ trách nhiệm về dữ liệu, hình ảnh, báo cáo liên quan tới nội dung trao đổi của bạn được thực hiện trên NetAlo. Bạn không được đưa virus hay đoạn mâ nào gây ảnh hưởng tới người khác hoặc khai thác thông tin người dùng một cách trái phép.</span><br />
        <span>6. Bất kì vi phạm nào liên quan tới điều khoản sử dụng sẽ trao cho NetAlo chấm dứt ngay dịch vụ mà bạn đang dùng trên nền tảng NetAlo dưới bất kì hình thức nào. NetAlo có quyền dẫn chiếu tới các điều khoản bạn vi phạm trong trường hợp tranh chấp và khiếu nại.</span><br /><br /><br />


        <div className="content__term--header">II. Phạm vi điều chỉnh của điều khoản dịch vụ</div>
        <span>1. Người sở hữu tài khoản quản trị NetAlo sẽ chịu trách nhiệm với toàn bộ điều khoản dịch vụ, trong phạm vi dịch vụ được NetAlo cung cấp.</span><br />
        <span>2. Người đăng ký sở hữu NetAlo sẽ được xem là người sở hữu tài khoản quản trị gốc và chịu trách nhiệm với toàn bộ điều khoản dịch vụ.</span><br />
        <span>3. Các tài khoản quản trị khác được cấp quyền bởi người sở hữu tài khoản quản trị gốc có trách nhiệm tuần thủ theo điều khoản dịch vụ này.</span><br />
        <span>4. Tài khoản thành viên trên NetAlo tuân thủ theo những quy định và điều khoản do người sở hữu tài khoản quản trị gốc cung cấp. NetAlo không chịu trách nhiệm liên đới khi có bất kì vi phạm nào liên quan đến pháp luật do các tài khoản thành viên gây ra.</span><br /><br /><br />


        <div className="content__term--header">III. Điều kiện chung</div>
        <span>Khi đăng ký tài khoản trên NetAlo, bạn được xem là đâ đọc và đồng ý với toàn bộ điều khoản sử dụng dịch vụ dưới đây của NetAlo :</span><br />
        <span>1. Hỗ trợ kĩ thuật được cam kết cung cấp đầy đủ theo từng gói dịch vụ của NetAlo. Các hoạt động hỗ trợ ngoài gói dịch vụ bạn đang sử dụng là không bắt buộc đối với NetAlo.</span><br />
        <span>2. Bạn không được quyền sử dụng dịch vụ của NetAlo cho bất kỳ hoạt động nào phạm pháp. Điều này áp dụng với luật của từng nước nơi bạn kinh doanh cũng như luật quốc tế.</span><br />
        <span>3. Bạn không được quyền sao chép, phân phối lại, bán, tạo các sản phẩm phát sinh, dịch ngược, đảo ngược kỹ thuật hoặc tháo rời các dịch vụ NetAlo cung cấp. Bạn cũng không được phép dùng bất kì biện pháp nào để can thiệp hoặc làm hỏng dịch vụ của NetAlo. Bạn phải bồi thường những tổn thất cho NetAlo khi bạn thương mại hóa dịch vụ của NetAlo cho 1 bên thứ ba mà không được sự cho phép đến từ NetAlo.</span><br />
        <span>4. Bạn không được quyền sử dụng bất kì hình ảnh bản quyền, logo hay bất kỳ sản phẩm có thương hiệu của NetAlo để truyền thông, quảng cáo hay nhằm mục đích thương mại mà chưa được sự cho phép của NetAlo.</span><br />
        <span>5. NetAlo chỉ trả lời các câu hỏi về Điều khoản dịch vụ của bạn qua email support@stockbook.vn. Mọi giải thích, trao đổi qua các kênh thông tin khác đều chỉ có giá trị tham khảo và không được dùng để dẫn chiếu khi xảy ra tranh chấp.</span><br />
        <span>6. Bạn cần được hiểu là mọi thông tin nội dung trên website của bạn (không bao gồm các thông tin được bảo vệ trong điều khoản Bảo mật) sẽ không được mâ hóa bảo mật.</span><br /><br /><br />


        <div className="content__term--header">IV. Quyền của NetAlo</div>
        <span>1. Chúng tôi có quyền sửa đổi hoặc chấm dứt dịch vụ vì việc vi phạm bất kỳ lý do nào trong điều khoản dịch vụ này, mà không cần thông báo trước.</span><br />
        <span>2. NetAlo có quyền từ chối cung cấp dịch vụ cho bất kỳ cá nhân, tổ chức nào với bất kỳ lý do nào.</span><br />
        <span>3. Chúng tôi có quyền được xóa nội dung, tài khoản hoặc bất kỳ thành viên nào trên hệ thống có dấu hiệu của việc vi phạm pháp luật, xúc phạm, đe dọa, khiêu dâm, tuyên tuyền tôn giáo, tín ngưỡng, chính trị bất hợp pháp hoặc cố tình xâm phạm sở hữu trí tuệ.</span><br />
        <span>4. NetAlo có quyền ngừng cung cấp dịch vụ và khóa bất kỳ tài khoản nào có hành vi, dấu hiệu hay bằng chứng gây tổn hại tới khách hàng của NetAlo, nhân viên của NetAlo, công ty sở hữu NetAlo.</span><br />
        <span>5. Chúng tôi không tiến hành xem trước hay kiểm duyệt bất kỳ nội dung, thông tin nào trên tài khoản của người dùng. Người dùng chịu mọi trách nhiệm liên quan tới nội dung do họ cung cấp trên nền tảng NetAlo.</span><br />
        <span>6. NetAlo có quyền cung cấp dịch vụ cho đối thủ cạnh tranh trực tiếp hoặc gián tiếp của bạn và không tiến hành cam kết độc quyền cho bất kỳ bên đối tác nào trong bất kỳ thị trường nào.</span><br />
        <span>7. Trong trường hợp có tranh chấp đền quyền sở hữu tài khoản, NetAlo có toàn quyền yêu cầu cung cấp bằng chứng để chứng thực quyền sở hữu tài khoản của bạn. Các bằng chứng này có thể bao gồm, và không giới hạn ở: những giấy tờ bản gốc hoặc sao chép về giấy phép kinh doanh của bạn, thẻ căn cước hoặc chứng minh thư nhân dân, hộ chiếu, các bản sao kê chuyển khoản thanh toán dịch vụ của ngân hàng,...</span><br />
        <span>8. NetAlo có quyền quyết định về quyền sở hữu hợp pháp đối với tài khoản và có thể chuyển quyền này đến người sở hữu hợp lệ. Trong trường hợp không xác định được quyền sở hữu chính xác đối với tài khoản và website, NetAlo sẽ khóa tài khoản và dừng mọi hoạt động trên website cho đến khi xác định được kết luận giữa tranh chấp của các bên đối với quyền sở hữu tài khoản.</span><br /><br /><br />


        <div className="content__term--header">V. Giới hạn trách nhiệm của NetAlo</div>
        <span>1. Bạn phải hiểu rõ và đồng ý rằng NetAlo sẽ không chịu trách nhiệm cho bất kỳ thiệt hại nào, do là trực tiếp, gián tiếp, chủ quan hay ngẫu nhiên, đặc biệt là các thiệt hại liên quan tới doanh thu, lợi nhuận, uy tín, quyền sử dụng, dữ liệu và các thiệt hại vô hình khác khi cung cấp dịch vụ.</span><br />
        <span>2. Trong mọi trường hợp, NetAlo hoặc nhà cung cấp dịch vụ gián tiếp, đối tác của chúng tôi sẽ không phải chịu trách nhiệm về những thiệt hại liên quan tới lợi nhuận do hậu quả phát sinh từ việc kết nối bị gián đoạn đến trang web của chúng tôi, dịch vụ của chúng tôi hay thỏa thuận này. Bạn cũng cần hiểu rằng những cá nhân liên quan trực tiếp tới NetAlo như công ty sở hữu NetAlo, đối tác của NetAlo, nhân viên của công ty sở hữu NetAlo,... cũng không chịu trách nhiệm về các thiệt hại nêu trên. Nếu bạn sử dụng dịch vụ do đối tác thứ ba cung cấp, họ có trách nhiệm cam kết với bạn và thực hiện theo những cam kết đó.</span><br />
        <span>3. NetAlo cam kết cung cấp đầy đủ và liên tục dịch vụ theo gói giá được công bố trên website của NetAlo trong thời gian bạn chi trả cho dịch vụ. Chúng tôi không có trách nhiệm buộc phải bảo hành hay duy trì dịch vụ sau khi bạn dừng hoặc chấm dứt dịch vụ chủ động hay bị động bởi bất kỳ lý do nào khác.</span><br />
        <span>4. Các cam kết liên quan tới tính liên tục của dịch vụ và bảo mật, tính năng khác của NetAlo được quy định rõ trong từng gói dịch vụ. NetAlo không chịu trách nhiệm về bất kỳ tính năng nào khác, hay bảo mật, tính liên tục của dịch vụ nằm ngoài quy định hay gói dịch vụ mà chúng tôi công bố.</span><br />
        <span>5. NetAlo không đảm bảo và chịu trách nhiệm cho các kết quả thu về từ việc sử dụng Dịch vụ của chúng tôi được công bố trên website hay bất kỳ kênh truyền thông nào khác là chính xác và đáng tin cậy. Các kết quả có thể mang tính chất thời điểm và phụ thuộc nhiều vào các yếu tố khách quan của thị trường, luật lệ khác.</span><br />
        <span>6. Bất kỳ vấn đề hay lỗi phát sinh nào trong quá trình sử dụng sản phẩm và dịch vụ của NetAlo sẽ được khắc phục trong điều kiện cho phép. NetAlo không đảm bảo bất kỳ kì vọng nào mà bạn mong đợi trong quá trình sử dụng sẽ được đáp ứng chính xác ngoài những tính năng và dịch vụ mà chúng tôi cung cấp theo gói. Các thỏa thuận khác nằm ngoài điều khoản này chỉ có giá trị khi có sự trao đổi và đồng thuận giữa NetAlo và người dùng.</span><br /><br /><br />


        <div className="content__term--header">VI. Từ bỏ và hoàn tất cam kết</div>
        <span>Nếu NetAlo có sai sót hoặc làm không đúng bất kỳ điều khoản nào đâ ghi trong bản điều khoản sử dụng này, không có nghĩa là điều đó bị hủy bỏ. Điều khoản sử dụng này được xem như là sự đồng ý toàn bộ giữa bạn và NetAlo và chi phối việc bạn sử dụng Dịch vụ của chúng tôi (không giới hạn ở bất kỳ phiên bản nào của Điều khoản dịch vụ sử dụng này).</span><br /><br /><br />

        <div className="content__term--header">VII. Sở hữu trí tuệ và Nội dung của khách hàng</div>
        <span>1. Chúng tôi không yêu cầu hay cung cấp bất kỳ quyền sở hữu trí tuệ nào đối với các nội dung mà bạn đăng tải lên nền tảng hay cung cấp cho các Dịch vụ của NetAlo. Tất cả các tài liệu dưới bất kì định nào nào được đăng tải trên tài khoản của bạn (thông qua NetAlo) đều có quyền sở hữu của riêng bạn. Bạn có toàn quyền xóa bỏ một phần hoặc toàn bộ nội dung đâ đăng tải bất kỳ lúc nào nào bằng cách xóa bỏ nội dung đăng, hoặc xoá bỏ tài khoản của chính mình. NetAlo không có trách nhiệm lưu trữ hay phục hồi sau khi bạn đâ xóa bỏ tài khoản.</span><br />
        <span>2. Bằng việc tải lên nội dung của mình trên tài khoản NetAlo do bạn sở hữu, bạn đâ đồng ý: NetAlo được quyền hiển thị và lưu trữ nội dung đâ đăng tải.</span><br />
        <span>NetAlo có quyền truy cập và tùy chỉnh những dữ liệu bạn đăng lên để đảm bảo tính phù hợp và thống nhất với hệ thống của chúng tôi.</span><br />
        <span>3.Bạn có quyền sở hữu toàn bộ nội dung trên tài khoản của mình cho dù đó là nội dung đăng tải trực tiếp hay dẫn nguồn gián tiếp qua các liên kết (links) tới NetAlo. Khi bạn đưa những nội dung này lên tài khoản của mình đồng nghĩa với việc bạn cho phép người khác truy cập và tiếp cận những nội dung này. Bạn cũng chịu toàn bộ trách nhiệm cho những nội dung bạn đưa lên có phù hợp với Pháp luật hay không.</span><br />
        <span>4. NetAlo cam kết không tiết lộ bất kỳ thông nào của bạn hay thương mại hóa, sử dụng nội dung, thương hiệu của bạn mà không được sự cho phép. Trừ trường hợp cần thông tin để giải quyết tranh chấp quyền sử dụng, hay các vấn đề pháp lý. Thông tin bảo mật trong cam kết bao gồm các thông tin tài khoản, thông tin cá nhân, thông tin về học viên và các dữ liệu nằm trong phạm vi bảo mật của NetAlo. Thông tin bảo mật không bao gồm:</span><br />
        <span style={{marginLeft: '15px'}}>a. Các thông tin đâ được công chúng hóa và truyền thông rộng rãi trước khi bạn sử dụng Dịch vụ của NetAlo.</span><br />
        <span style={{marginLeft: '15px'}}>b. Các thông tin được cung cấp trên mạng internet bởi bất kỳ bên nào khác mà không có lưu ý về việc trích dẫn hay bản quyền.</span><br />
        <span style={{marginLeft: '15px'}}>c. Thông tin được cho phép công bố bởi bạn.</span><br />
        <span style={{marginLeft: '15px'}}>d. Thông tin được yêu cầu cung cấp bởi luật pháp hoặc các cơ quan luật pháp.</span><br /><br /><br />


        <div className="content__term--header">VIII. Tính năng</div>
        <span>1. Bạn có quyền tùy chỉnh màu nền và ảnh nền trên tài khoản của bạn theo ý muốn của chính bạn. NetAlo không tiến hành kiểm tra và không chịu trách nhiệm về những thay đổi do bạn tự điều chỉnh.</span><br />
        <span>2. Các tính năng mà NetAlo cung cấp cho bạn nằm trong gói dịch vụ mà bạn đang sử dụng với NetAlo. Bạn có thể có quyền sử dụng một số tính năng mới sau mỗi bản cập nhật mà chúng tôi có thông báo với bạn trên ứng dụng. Tuy nhiên, chúng tôi không có trách nhiệm duy trì những tính năng này nếu chúng không có trong gói dịch vụ tại thời điểm bạn sử dụng dịch vụ của NetAlo theo bảng giá tại thời điểm đó.</span><br />
        <span>3. Các tính năng đi theo gói dịch vụ cụ thể và không thể tách rời. NetAlo không có trách nhiệm cung cấp các tính năng nằm ngoài gói dịch vụ mà bạn đang sử dụng cũng như tính năng không có trong gói dịch vụ. Nếu bạn mong muốn chức năng ở gói dịch vụ cao hơn, vui lòng nâng cấp để sử dụng. Nếu bạn mong muốn chức năng không có trong phần bảng giá, vui lòng liên hệ NetAlo để được nhận tư vấn và báo giá.</span><br />
        <span>4. Với các tính năng tích hợp từ bên đối tác thứ ba khác, NetAlo không chi trả cho các chi phí phát sinh khi bạn sử dụng các tính năng này, chúng tôi không có trách nhiệm nào khác ngoài nghĩa vụ kết nối giữa người sở hữu website và các bên cung ứng tính năng tích hợp. Tất cả chi phí phát sinh hay thiệt hại có thể xảy ra nằm ngoài nghĩa vụ, trách nhiệm của NetAlo và NetAlo sẽ không bồi thường cho bất kỳ thiệt hại hay tổn thất nào xảy ra khi bạn sử dụng tính năng được tích hợp của bên khác trên hệ thống của NetAlo.</span><br />
        <span>5. Với các hành động, thao tác tùy chỉnh tính năng nằm ngoài thông báo của NetAlo và do bất kỳ ai khác ngoài NetAlo gây ra, chúng tôi không chịu trách nhiệm với bất kỳ tổn thất hay chi phí phát sinh xảy ra bởi các hoạt động này. Bạn vui lòng liên hệ với các phía đối tác cung cấp dịch vụ để làm rõ trách nhiệm của họ trước khi tiến hành điều chỉnh website dạy học trực tuyến của mình. Các đoạn mâ hay dữ liệu đăng tải lên hệ thống NetAlo nếu gây ra những xung đột hoặc tổn hại tới hệ thống hiện tại sẽ được gỡ bỏ mà không cần báo trước.</span><br /><br /><br />

        <div className="content__term--header">IX. Đội ngũ hỗ trợ của NetAlo</div>
        <span>1. Đội ngũ hỗ trợ của NetAlo là những nhân viên hoặc những người được NetAlo chứng nhận làm các công việc liên quan tới hỗ trợ khách hàng sử dụng sản phẩm và dịch vụ của NetAlo. Các đội ngũ kĩ thuật khác nằm ngoài đối tượng kể trên hoặc chưa nhận được sự chấp thuận, đồng ý của NetAlo sẽ không được tính vào đội ngũ hỗ trợ của chúng tôi.</span><br />
        <span>2. NetAlo hỗ trợ dịch vụ qua email, điện thoại, hỗ trợ trực tiếp hoặc thông qua các link liên kết trên nền tảng Stockchat. Tùy thuộc vào gói dịch vụ bạn sử dụng mà một không hình thức hỗ trợ hay thời gian hỗ trợ trong ngày sẽ không khả dụng cho tài khoản của bạn. Các hỗ trợ khác nằm ngoài định nghĩa này và nằm ngoài đối tượng nêu ở mục IX.1 sẽ không nằm trong trách nhiệm của NetAlo.</span><br />
        <span>3. NetAlo có quyền không hỗ trợ trong các trường hợp sau:</span><br />
        <span style={{marginLeft: '15px'}}>a. Bạn không phải là người sở hữu tài khoản người dùng Stockchat;</span><br />
        <span style={{marginLeft: '15px'}}>b. Bạn liên hệ qua các hình thức hoặc đối tượng không nằm trong điều IX.1 và IX.2;</span><br />
        <span style={{marginLeft: '15px'}}>c. Thời gian hỗ trợ nằm ngoài phạm vi trách nhiệm của NetAlo;</span><br />
        <span style={{marginLeft: '15px'}}>d. Yêu cầu hỗ trợ của bạn nằm ngoài các tính năng đâ được quy định trong mục XIII;</span><br />
        <span style={{marginLeft: '15px'}}>e. Trường của bạn đang trong tình trạng tranh chấp quyền sở hữu hoặc bị khóa vì bất kỳ lý do nào;</span><br />
        <span style={{marginLeft: '15px'}}>f. Bất kể hoạt động nào vi phạm Pháp luật hoặc Điều khoản dịch vụ này.</span><br />
        <span>4. Chúng tôi không có trách nhiệm hỗ trợ các tài khoản học viên hay người sử dụng website của bạn một cách trực tiếp hay gián tiếp nào khác. Khi gặp bất kỳ vấn đề nào trục trặc hoặc lỗi kĩ thuật, NetAlo chỉ có nghĩa vụ và trách nhiệm trả lời người sở hữu tài khoản quản trị website dạy học trực tuyến. Các đối tượng người dùng khác khi gửi yêu cầu hỗ trợ về NetAlo có thể nhận được giải đáp trong một số trường hợp. Tuy nhiên, chúng tôi không chịu trách nhiệm hay có nghĩa vụ phải trả lời cũng như hỗ trợ cho đối tượng khác ngoài người sở hữu tài khoản quản trị website.</span><br /><br /><br />


        <div className="content__term--header">X. Giới hạn trách nhiệm pháp lý</div>
        <span>1. Trong phạm vi tối đa được pháp luật cho phép, NetAlo sẽ không chịu trách nhiệm về bất kỳ thiệt hại trực tiếp, gián tiếp, ngẫu nhiên, đặc biệt, hậu quả hoặc mang tính chất trừng phạt, bao gồm nhưng không giới hạn ở các thiệt hại về mất mát doanh thu, lợi nhuận, uy tín, sử dụng, dữ liệu Tổn thất vô hình do hậu quả của :</span><br />
        <span style={{marginLeft: '15px'}}>a. Việc sử dụng hoặc không thể sử dụng nền tảng NetAlo;</span><br />
        <span style={{marginLeft: '15px'}}>b. Bất kỳ các thay đổi nào được thực hiện đối với website của NetAlo;</span><br />
        <span style={{marginLeft: '15px'}}>c. Truy cập không được phép hoặc biến đổi các dữ liệu;</span><br />
        <span style={{marginLeft: '15px'}}>d. Xóa, sai hỏng, hoặc không lưu trữ dữ liệu có trên hoặc thông qua nền tảng của NetAlo;</span><br />
        <span style={{marginLeft: '15px'}}>e. Các tuyên bố hay hành vi của bất kỳ bên thứ ba nào đối với NetAlo;</span><br />
        <span style={{marginLeft: '15px'}}>f. Bất kỳ vấn đề nào khác liên quan đến NetAlo.</span><br />
        <span>2. Các tiêu đề chỉ nhằm mục đích tiện lợi và sẽ không được sử dụng để diễn giải các điều khoản của Thỏa thuận này. Nếu bất kỳ điều khoản nào của Thỏa thuận này được phát hiện không hợp lệ hoặc không thể thi hành được bởi bất kỳ tòa án có thẩm quyền nào, thì điều khoản đó sẽ bị cắt đứt khỏi Thỏa thuận này</span><br /><br /><br />
      </div>      

      <div className={zget(vm.props, 'langValue')==='en'?'dksd_body':'dksd_body_hiden'}>
      </div>*/}  
    </div>    
  </div>
</div>
export const renderFoot = (vm) => <div />
export const renderComponent = (vm) => <div>
  {Parser(adminCSS)}
  {vm.renderBody()}
  {vm.renderFoot()}
</div>
