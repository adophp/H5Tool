### H5

> 免费H5页面制作,微信h5页面,电子邀请函,h5页面制作工具,微信场景制作,移动营销,邀请函模板

**使用VUE框架，后端上传使用PHP**

#### 安装方法进入文件夹下运行

```bash
# 安装依赖
npm install

# 运行开发环境 localhost:8080
npm run dev

# 打包成html文件,生成文件在目录dist文件夹下面
npm run build
```

修改配置文件src/config/index.js：

1)、上传路径：upload，[后端相关代码请查看](#php_anchor)

2)、联系邮箱：contactEmail

----------------------


主要使用:

element-ui

vue-draggable-resizable

animate

![Image](./20200112-225232%402x.png)

特别感谢此博主：

[https://blog.csdn.net/dongguan_123/article/details/102576308](https://blog.csdn.net/dongguan_123/article/details/102576308)

----------------

<div id="php_anchor"></div>

#### 后端代码 

图片上传,使用thinkphp5的上传类

```php
// 文件上传接口
public function upload(){
  $upload_file = BASE_UPLOAD_PATH . DS . ATTACH_ARTICLE . DS;// 文件上传路径
  $file_object = request()->file('fileupload');
  $errMsg = '';
  if ($file_object) {
    // ALLOW_IMG_EXT 上传文件后缀名
    $info = $file_object->rule('uniqid')->validate(['ext' => ALLOW_IMG_EXT.',mp3,mp4'])->move($upload_file);
    if ($info) {
      $file_name = $info->getFilename();
    } else {
      $errMsg = $file_object->getError();
    }
  } else {
    $errMsg = 'error';
  }

  if ($errMsg != '') {
    callback_json_encode(10001, $errMsg);
  }else{
    $extension = pathinfo($info->getInfo('name'), PATHINFO_EXTENSION);
    $old_name = pathinfo($info->getInfo('name'), PATHINFO_FILENAME);
    $data = array();
    $data['file_name'] = $old_name;
    $data['file_path'] = UPLOAD_SITE_URL.'/' . ATTACH_ARTICLE . '/'.$file_name;
    $extension = strtolower($extension);

    if ($extension == 'mp4') {
      $this->getVideoCover($upload_file.$file_name, $upload_file.$file_name.'.jpg');
      if (file_exists($upload_file.$file_name.'.jpg')) {
        $data['thumb'] = $data['file_path'].'.jpg';
        $imageSize = @getimagesize($upload_file.$file_name.'.jpg');
        if (!empty($imageSize)) {
          $data['width'] = $imageSize[0];
          $data['height'] = $imageSize[1];
        }
      }
      $file_time = $this->getTime($upload_file.$file_name);
      if (isset($file_time['vtime'])) {
        $data['duration'] = $file_time['vtime'];
      }
    }elseif ($extension == 'mp3') {
      //
    }else{
      $data['width'] = $info->getImageSize('width');
      $data['height'] = $info->getImageSize('height');
    }
    callback_json_encode(10000, 'ok', $data);
  }
}


// 获得视频文件的缩略图
private function getVideoCover($file, $name = null, $time = null)
{
  if (empty($time)) $time = '1';//默认截取第一秒第一帧
  //        $file = str_replace("/", "\\\\", $file);
  $extension = strrchr($file, '.');
  if ($extension != 'mp4'){
    $outfile = str_replace($extension, ".mp4", $file);
  }else{
    $outfile = $file;
  }
  $name = empty($name) ? $outfile . '.jpg' : $name;//缩略图命名
  //exec("ffmpeg -i ".$file." -y -f mjpeg -ss ".$time." -t 0.001 -s 320x240 ".$name."", $out, $status);
  //        $str = "ffmpeg -i " . $file . " -y -f mjpeg -ss 3 -t " . $time . " -s 320x240 " . $name;
  $str = "ffmpeg -i " . $file . " -y -f mjpeg -ss 3 -t " . $time . " ". $name;
  system($str);
}

// 获得视频文件的总长度时间和创建时间
private function getTime($file)
{
  $vtime = exec("ffmpeg -i " . $file . " 2>&1 | grep 'Duration' | cut -d ' ' -f 4 | sed s/,//");//总长度 00:00:05.80
  $ctime = date("Y-m-d H:i:s", filectime($file));//创建时间
  $duration = explode(":",$vtime);
  $format = sprintf("%02d", ($duration[0]*60 + $duration[1])) . ':' . sprintf("%02d", round($duration[2]));//转化为分:秒
  return array('vtime' => $format,
               'ctime' => $ctime
              );
}
```

Ffmpeg配置

[ffmpeg安装](http://adophper.com/article-id-1167.html)





