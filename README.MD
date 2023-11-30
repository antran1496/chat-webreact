## Require Install
> nodejs   
> yarn   
> electron  

## Dev Web NetAlo
> cd web  
> npm install  
> yarn dev   

## Build Web Product
> cd web  
> npm install  
> yarn build   

## Run Web With Production Use Nginx
> cd web  
> npm install  
> yarn build     

## Config File nginx
```
	server {
	  listen       80;
	  server_name   SERVER_NAME;
	  charset       utf-8;

	  location / {
	    if (!-f $request_filename) {
	      rewrite ^(.*)$ /index.html last;
	    }

	    root RESOURCE_PATH_BUILD;
	    index  index.html index.htm;
	  }

	  error_page   500 502 503 504  /50x.html;
	  location = /50x.html {
	    root   html;
	  }
	}
```

**Note 1: SERVER_NAME là host domain hay address ip của mình (với local là 127.0.0.1), RESOURCE_PATH_BUILD là đường dẫn tuyệt đối sau khi build web đến thư mục build**   

**Note 2: Chú ý các file cấu hình giữa Dev và Product và các white lable ở trong file cấu hình ./web/src/config/**


## Dev Electron  
> cd electron_prod  
> ./buildweb.sh  
> cp -rf ./electron/* ./build  
> rm -rf ./build/package.json  
> mv -f ./build/package_mac.json ./build/package.json    
> cd ./build  
> yarn  
> cp -rf ../Static/NetAlo.app ./node_modules/node-notifier/vendor/   
> rm -rf node_modules/node-notifier/vendor/mac.noindex  

**Note 1: Tiến hành code trên file edit khi thao tác chức năng liên quan đến Electron, khi thao tác những chức năng trên client web thì thao tác trên web như bình thường sau đó chạy lại script buildweb.sh**

**Note 2: Sau khi code hoàn tất, copy những phần đã sửa trong các file vào thư mục ./electron_prod/electron/ , cần cập nhật các file package.json và package_mac.json nếu có chỉnh sửa file package_mac.json**

**Note 3: File package.json trong ./electron_prod/electron/ có tác dụng trong việc build MAS (Mac Apple Store), File package_mac.json trong ./electron_prod/electron/ có tác dụng trong việc build một file mac thông thường**   

## Build Electron MAC (create file .dmg, .zip) (Yêu cầu cần các chứng chỉ cần thiêt)
> cd electron_prod  
> ./buildweb.sh  
> ./buildmac.sh  

**Note 1: Cần tăng version release khi release mới với lệnh:**
`./buildmac.sh 1.0.2`

**Note 2: File sau khi build sẽ nằm trong thư mục ./build/dist**

**Note 3: Cần cập nhật Release mới trong file updates.json build/static/config/updates.json trên server. Các file releases.json và .zip sau khi build có thể đặt trên dropbox**

**Note 4: Cần cập nhật file stickerData.json mới trong build/static/config/stickerData.json trên server khi có danh sách sticker được cập nhật và ưu tiên update bản web lên server trước để cập nhật các sticker mới nhất**

## Build Electron MAS (create file .pkg) (Yêu cầu cần các chứng chỉ cần thiêt) (Trên máy mac cần cài thêm gói productbuild bằng brew, và XCode)
> cd electron_prod  
> ./buildweb.sh  
> ./buildmas.sh  

**Note 1: Cần tăng version release khi trước khi build. Chỉnh biến appVersion trong file buildmas.sh**





