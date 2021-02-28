# b6k

https://b6k.pickoma.com

簡易的網路書籤

# 使用到的技術或服務

* Vue3
* Vuex
* Vue Router
* Tailwindcss
* WebPack
* google datastore
* google cloud storage
* jwt
* Bookmarklet

# 簡單架構

```
                             [google cloud storage]
browser <---> cloudflare <--->  b6k.pickoma.com     

                         <--->  b6k-api.pickoma.com <---> google datastore
                                [google cloud run]
       
```

# 功能

註冊並登入帳號後，可以儲存指定的網址且可以加入標籤以用來搜尋過濾相關網址。

# Bookmarklet

可以使用`Bookmarklet`快速加入書籤（需先登入）。

```
javascript:(function(){     let current_url = encodeURIComponent(document.URL);     window.open(`https://b6k.pickoma.com/#/quickadd/${current_url}`,"_blank","width=200,height=200")%20})();%20%20//%20https://en.wikipedia.org/wiki/Bookmarklet
```

# 注意事項

`Firefox`有可能會遇到`CORS`問題，需要把憑證加入例外清單才會正常運作。

# 待處理項目

* 訪客的檢視頁面

* 加入預覽圖
  目前沒有實作的原因是因為這會多花錢

* 加強搜尋功能
  `google datastore`並沒有`where in`或是`or`功能，所以有些查詢會很難處理

* 統計數據
  可以使用`google bigquery`來定時處理

# 截圖

## 登入頁面

![登入頁面](https://github.com/Kcars/b6k/blob/master/screenshots/1.png?raw=true)

## 首次登入的空白主頁面

![空白主頁面](https://github.com/Kcars/b6k/blob/master/screenshots/2.png?raw=true)

## 加入書籤頁面

![加入書籤頁面](https://github.com/Kcars/b6k/blob/master/screenshots/3.png?raw=true)

## 主頁面

![主頁面](https://github.com/Kcars/b6k/blob/master/screenshots/4.png?raw=true)

## 查詢結果頁面

![查詢結果頁面](https://github.com/Kcars/b6k/blob/master/screenshots/5.png?raw=true)