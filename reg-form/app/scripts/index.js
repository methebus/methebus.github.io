import Vue from './vue.js';

require('./Components/Selector.js')
require('./Components/CheckInput.js')
require('../stylesheets/index.scss')

import citiesSource from '../data/cities.json';
import countries from '../data/countries.json';

function Data() {
  this.name = '';
  this.email = '';
  this.countries = countries;
  this.country = 0;
  this.city = 0;
  this.social = {
    facebook: null,
    vk: null,
    twitter: null,
    ok: null
  };
  this.networkTitles = {
    'facebook': 'Facebook',
    'vk': 'Вконтакте',
    'twitter': 'Twitter',
    'ok': 'Одноклассники'
  };
  this.pic = '';
  this.pictures = ['cat1', 'cat2', 'cat3', 'dog4'];
  this.step = 0;
  this.steps = ['Введите имя и e-mail', 'Выберите страну и город', 'Отметьте социальные сети', 'Выберите любимого котика'];
  this.errors = {
    name: '',
    email: '',
    country: '',
    city: '',
    facebook: '',
    vk: '',
    twitter: '',
    ok: '',
    pic: ''
  };
  this.lastCorrect = -1;
}

var regData = new Data();

var app = new Vue({
  el: '#app',
  data: regData,
  methods: {
    checkForm: function(e) {
      var elem;
      if(typeof(e) == "string")
        elem = e;
      else
        elem = e.path[0].getAttribute("name");
      switch(elem) {
        case 'name':
          if(this.name.trim().match(/^[а-яА-ЯєЄїЇіІёЁa-zA-Z ]*$/) == null || this.name.trim().length < 2) {
            this.errors.name = 'введите имя, используя символы кириллицы и латиницы';
          } else {
            this.errors.name = '';
          }
          break;
        case 'email':

        // я міг би використати регулярний вираз із http://emailregex.com/, але навіщо,
        // якщо можна просто нагадати користувачу про наявність @, правильний домен
        // і відравити йому email для валідації?

        if(this.email.match(/^.*@.{1,}\..{2,}$/) == null) {
          if(this.email.indexOf("@") == -1)
            this.errors.email = 'в адресе должен быть символ «@»';
          else if(this.email.match(/^.*@.{1,}\.?.{0,1}$/) != null)
            this.errors.email = 'проверьте правильность почтового домена';
          else
            this.errors.email = 'введите корректный email';
        } else {
          this.errors.email = '';
        }
          break;
        case 'country':
          if(this.country == 0)
            this.errors.country = 'выберите страну из списка';
          else
            this.errors.country = '';
          break;
        case 'facebook':
          if(this.social.facebook != null && this.social.facebook.match(/^(https?:\/\/)?(www\.)?(facebook|fb)\.com\/.{1,}$/) == null)
            this.errors.facebook = 'проверьте ссылку на вашу страницу в Facebook';
          else
            this.errors.facebook = '';
          break;
        case 'twitter':
        if(this.social.twitter != null && this.social.twitter.match(/^(https?:\/\/)?(www\.)?twitter\.com\/.{1,}$/) == null)
          this.errors.twitter = 'проверьте ссылку на вашу страницу в Twitter';
        else
          this.errors.twitter = '';
          break;
        case 'ok':
        if(this.social.ok != null && this.social.ok.match(/^(https?:\/\/)?(www\.)?ok\.ru\/.{1,}$/) == null)
          this.errors.ok = 'проверьте ссылку на вашу страницу в Одноклассниках';
        else
          this.errors.ok = '';
          break;
        case 'vk':
        if(this.social.vk != null && this.social.vk.match(/^(https?:\/\/)?(www\.)?vk\.com\/.{1,}$/) == null)
          this.errors.vk = 'проверьте ссылку на вашу страницу во Вконтакте';
        else
          this.errors.vk = '';
          break;
      }
      if(this.errors.email == '' && this.errors.name == '' && this.email.length > 0 && this.name.length > 0) {
        this.lastCorrect = 0;
        if(this.country > 0) {
          this.lastCorrect = 1;
          if(this.errors.vk == '' && this.errors.facebook == '' && this.errors.ok == '' && this.errors.twitter == '') {
            this.lastCorrect = 2;
          }
        }
      } else
        this.lastCorrect = -1;

      this.step = Math.min(this.lastCorrect + 1, this.step);
    },
    choosePic: function(e) {
      this.pic = e.path[0].getAttribute('rel');
      if(this.pic.indexOf('cat') == -1 && this.pic.indexOf('dog') != -1) {
        this.errors.pic = 'Вы выбрали собачку. А надо котика.';
        this.lastCorrect = 2;
      } else {
        this.errors.pic = '';
        this.lastCorrect = 3;
      }
    },
    resetData: function() {
      regData = new Data();
      for(var key in regData) {
        app[key] = regData[key];
      }
    }
  },
  computed: {
    cities: function() {
      var citiesObj = {};
      if(this.country != 0) {
        for(var city in citiesSource) {
          if(citiesSource[city]['country'] == this.country) {
            citiesObj[city] = citiesSource[city]['name'];
          }
        }
      }
      return citiesObj;
    }
  }
});

getStep();

window.onhashchange = getStep;

function getStep() {
  let step = location.hash.match(/^#step([1-5])$/);
  if(step == null) {
    location.hash = 'step' + (Math.min(app.lastCorrect + 1, app.step) + 1);
  } else {
    app.step = Math.min(step[1] - 1, app.lastCorrect + 1);
    location.hash = 'step' + (app.step + 1);
  }
}
