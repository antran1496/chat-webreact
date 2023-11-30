// Gen new CODE
rxgen reactuni test

// Gen new CONTROLLER (http://domain/tempname)
rxgen reactuni test '{"c":"tempname1"}'

// Gen new CONTROLLER with PARRENT (http://domain/admin/tempname)
rxgen reactuni test '{"c":"tempname2", "p":"admin"}'

// Gen new CONTROLLER with PARRENT has RELATION (tempcate is a added controller)
rxgen reactuni test '{"c":"tempchild1", "p":"admin", "cate": "tempname1"}'

// Gen new CONTROLLER with PARRENT has RELATION and ADDITION DATAS 
rxgen reactuni test '{"c":"tempchild2", "p":"admin", "cate": "tempname1", "m": ["donejob", "innotime"]}'
