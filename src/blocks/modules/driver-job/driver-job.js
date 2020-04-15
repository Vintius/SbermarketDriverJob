import "@babel/polyfill";
import Vue from 'vue';
import Multiselect from 'vue-multiselect';
import {mask} from 'vue-the-mask';
import axios from 'axios';
// import qs from 'qs';

window.submitted = false;

window.driver_job = new Vue ({
    el: '#driverJob',
    components: {
      Multiselect
    },
    directives: {
       mask
    },
    data: {
        ofertaOpened: false,
        cities: [],
        countries: [
          'РФ',
          'Беларусь',
          'Армения',
          'Казахстан'
        ],
        city_value: {name: 'Москва', id: 1},
        country_value: [],
        isTouched: false
    },
    computed: {
      urlVars: function(){
          let uri = window.location.search.substring(1),
              vars = uri.split('&'),
              getVars = {},
              tmp = [];

          vars.forEach(function(v){
              tmp = v.split('=');
              if(tmp.length === 2){
                  getVars[tmp[0]] = tmp[1];
              }
          });
          return getVars;
      }
    },
    methods: {
        scrollFocus: function (scroll, focus) {
         this.$nextTick(function () {
            document.getElementById(scroll).scrollIntoView();
            document.getElementById(focus).focus();
         });
        },
        // sendForm: function () {
        //
        //     // const data = {
        //     //     'entry.1785355285': 'test'
        //     // };
        //     // const options = {
        //     //     method: 'POST',
        //     //     headers: { 'content-type': 'application/x-www-form-urlencoded' },
        //     //     data: qs.stringify(data),
        //     //     url: document.getElementById('form_id').action,
        //     // };
        //     // axios(options);
        //     let form = document.getElementById('form_id');
        //
        //     form.submit();
        // }
        // clearSuccess: function () {
        //     if(this.submitted) {
        //         // document.querySelectorAll('input[type=text], input[type=tel]')
        //         //     .forEach(el=>el.value = '');
        //        alert('Форма отправлена');
        //     }
        // }
        // onTouch: function () {
        //     this.isTouched = true
        // }
    },
    created: function () {
      axios.get('https://cors-anywhere.herokuapp.com/https://sbermarket.ru/api/operational_zones?sort=name')
          .then(response => {
             this.cities = response.data.operational_zones;
          })
          .catch(error => {
             console.log(error);
          })
    }
});

// document.getElementById('form_id').addEventListener('submit', function (e) {
//     e.preventDefault();
//     e.target.submit();
// });