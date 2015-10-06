var sass = require("node-sass");
var sassUtils = require("node-sass-utils")(sass);

var result = sass.render({
  file: "perftest.scss",
  functions: {
    "perftest-js($value)": function($value) {
      // just return the value
      return $value;
    },

    // timer function so we can see how long things took
    "timer($time: null)": function($time) {
      var currentTime = Date.now();
      var time = sassUtils.castToJs($time);
      if (time) {
        time = currentTime - time.value;
      }
      else {
        time = currentTime;
      }

      return sassUtils.castToSass(time);
    }
  }
}, function(err, out) {
  console.log(err, out && out.css.toString());
});
