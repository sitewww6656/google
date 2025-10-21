(function(){
  enableHome()
  function enableHome() {
    var character = {
        init: function () {
            var _self = this
            _self.$topSpots = $('.wp-tab-label')
            _self.$items = $('.YcenterPosition')
            var max = this.$topSpots.length;
            _self.currIndex = 0
            _self.data = {
                max: max,
                classCenter: "p4",
                classLeft: ['p2', 'p3'],
                classRight: ['p5', 'p6'],
                leftHide: 'p0',
                rightHide: 'p7',
                hideNum: Math.floor((max - 5) / 2),
                speed: 3000
            }

            this.changeCertify(_self.currIndex)
            this.startAutoplay()
            for (var i = 0; i < _self.$topSpots.length; i++) {
                (function (i) {
                _self.$topSpots[i].onmouseenter = function () {
                    _self.stopAutoplay()
                    _self.changeCertify(i)
                }
                })(i)
            }
            // _self.$topSpots.mouseenter(function () {
            //     _self.stopAutoplay()
            //     _self.changeCertify($(this).index($('.wp-tab-label')))
            // })
            _self.$topSpots.mouseleave(function () {
                _self.startAutoplay()
            })
            _self.$items.mouseenter(function () {
                _self.stopAutoplay()
            })
            _self.$items.mouseleave(function () {
                _self.startAutoplay()
            })
            _self.$items.click(function () {
                _self.changeCertify($(this).index())
            })
        },
        changeCertify: function (index) {
            var me = this.data
            if (index < 0 || index >= me.max) return
            this.currIndex = index
            this.$topSpots.eq(index).addClass('active').siblings().removeClass('active')
            //因为只展示五个
            var arr = new Array(me.max);
            var left = index - 1;
            var right = index + 1;
            arr[index] = me.classCenter;
            var count = me.hideNum + 1; //左右都需要减两次
            var classLeft = me.classLeft.slice(0);
            while (count >= 0) {
                if (left < 0) {
                    left = me.max - 1;
                }
                if (classLeft.length >= 0) {
                    arr[left] = classLeft.pop();
                } else {
                    arr[left] = me.leftHide;
                }

                left--;
                count--;
            }
            count = me.hideNum + 1;
            var classRight = me.classRight.slice(0);
            while (count >= 0) {
                if (right >= me.max) {
                    right = 0;
                }
                if (classRight.length) {
                    arr[right] = classRight.shift();
                } else {
                    arr[right] = me.rightHide;
                }
                right++;
                count--;
            }

            for (var i = 0; i < arr.length; i++) {
                if (!arr[i]) {
                    arr[i] = me.rightHide;
                }
            }
            this.$items.each(function (i, el) {
                this.className = 'YcenterPosition ' + arr[i]
            })
        },
        startAutoplay: function () {
            if (this.timer) clearTimeout(this.timer) && (this.timer = null)
            var _self = this
            this.timer = setTimeout(function () {
                var i = _self.currIndex + 1
                if (i >= _self.data.max) {
                    i = 0
                }
                _self.changeCertify(i)
                _self.timer = null
                _self.startAutoplay()
            }, this.data.speed)
        },
        stopAutoplay: function () {
            if (this.timer) clearTimeout(this.timer) && (this.timer = null)
        }
    }
    character.init()
}
})()