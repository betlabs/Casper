/*!
 * PixelArt v0.0.1
 * Paint pixel art / 8 bit
 * http://betlabs.ru/
 * MIT License
 * by Andrey Pavlov | @hose314
 */

var 
	AgileTXT = require('./DrawComponents/Components').agileTxt,
	CITxt = require('./DrawComponents/Components').ciTxt,
	Arrow = require('./DrawComponents/Components').arrowComp,
	RND = require('./DrawComponents/Components').rndComp;

function generateRandom() {
    var x = Math.floor(Math.random() * (window.innerWidth));
	var y = Math.floor(Math.random() * (window.innerHeight));
	while (Math.sqrt(Math.pow(window.innerWidth /2 - x, 2) + Math.pow(window.innerHeight/2 - y , 2)) < window.innerWidth / 3) 	   
	{
		x = Math.floor(Math.random() * (window.innerWidth));
		y = Math.floor(Math.random() * (window.innerHeight));	
	} 
	return [x, y];
}
var data = [];
var persons = [AgileTXT, CITxt, RND];
var dotsAmount = (function getMaxDotsAmount(objs) {
	var maxVal = 0;
	for (var i = 0; i < objs.length; ++i) {
		var s = 0;
		for (var j = 0; j < objs[i].components.length; ++j) {
			for (var k = 0; k < objs[i].components[j].mtx.length; ++k ) {
				for (var m = 0; m < objs[i].components[j].mtx.length; ++m) {
					if (objs[i].components[j].mtx[k][m] == 1) {
						s += 1;
					}
				}
			}
			if (s > maxVal) {
				maxVal = s;
			}
		}
	}
	return maxVal;
})(persons);

for (var i = 0; i < dotsAmount; ++i) {
	data.push(i);
}
$('.intro').append('<svg class="intro-svg" width="100%" height="100%" preserveAspectRatio="none"></div');
var parts = d3.select(".intro-svg")
	.selectAll("circle")
	.data(data)
	.enter()
	.append("circle")
	.transition()
	.duration(2000)
	.ease("quad-in-out")
	.attr("cy", function() {return Math.random()*window.innerHeight})
	.attr("cx", function() {return Math.random()*window.innerWidth})
	.attr("r", 0);


var layout = {
	amp: 0,
	fr: 0,
	sayWords: function(s) {
		$('.introduction-text').text(s);
	},
	runHeart: function() {
		var dotSize = d3.selectAll("circle")[0].length;
		scaleX = d3.scale.linear().domain([-20, 20]).range([window.innerWidth/5, window.innerWidth*4/5]);
		scaleY = d3.scale.linear().domain([-20*window.innerHeight/window.innerWidth, 20*window.innerHeight/window.innerWidth]).range([window.innerHeight/5, window.innerHeight*4/5]);
		var dataset = [];
		var t = 0;
		for (var i = 0; i < dotSize; ++i) {
			dataset.push([16*Math.pow(Math.sin(t), 3),-( 13*Math.cos(t) - 5*Math.cos(2*t) - 2*Math.cos(3*t)-Math.cos(4*t))])
			t += 2*Math.PI / dotSize;
		}
		d3.selectAll("circle")
			.data(dataset)
			.enter();
		d3.selectAll("circle")
			.transition()
			.duration(1000)
			.ease("quad-in-out")
			.attr("cx", function(d) { return scaleX(d[0])})
			.attr("cy", function(d) { return scaleY(d[1])})
			.attr("r", function() { return Math.random() * (window.innerWidth/73 - window.innerWidth/75) + window.innerWidth/75})
			.style("fill", "#F44336")
			.style("stroke", "#F44336")
			.style("opacity", 0.8);
	},
	runSin: function(a, f) {
		this.sinSize = a;
		this.fr = f;
		scaleX = d3.scale.linear().domain([0, f*Math.PI]).range([window.innerWidth/5, window.innerWidth*4/5]);
		scaleY = d3.scale.linear().domain([-a*window.innerHeight/window.innerWidth, a*window.innerHeight/window.innerWidth]).range([window.innerHeight/5, window.innerHeight*4/5]);
		var dataset = [];
		var x = 0, y = 0;
		for (var i = 0; i < dotSize; ++i) {
			dataset.push([x, Math.sin(x)])
			x += f*Math.PI/dotSize;
		}
		d3.selectAll("circle")
			.data(dataset)
			.enter();
		d3.selectAll("circle")
			.transition()
			.duration(2000)
			.ease("quad-in-out")
			.attr("cx", function(d) { return scaleX(d[0])})
			.attr("cy", function(d) { return scaleY(d[1])})
			.attr("r", function() { return Math.random() * (window.innerWidth/73 - window.innerWidth/75) + window.innerWidth/75})
			.style("fill", "#00C853")
			.style("stroke", "#00C853");
	},
	runChaos: function(a) {
		if (a === undefined) {
			d3.selectAll("circle")
				.transition()
				.duration(1500)
				.ease("quad-in-out")
				.attr("cy", function() {return Math.random()*window.innerHeight})
				.attr("cx", function() {return  Math.random()*window.innerWidth})
				.attr("r", function() {return Math.random()*window.innerWidth/20})
				.style("fill", "#39A9ED")
				.style("stroke", "#39A9ED")
				.style("opacity", 0.2);
		} else {
			var side = Math.min(window.innerHeight, window.innerWidth) / 2;
			var spaceScaleX = d3.scale.linear().domain([0, 24]).range([(window.innerWidth - side)/2, (window.innerWidth - side)/2 + side]),
			spaceScaleY = d3.scale.linear().domain([0, 24]).range([(window.innerHeight - side)/2, (window.innerHeight - side)/2 + side]);
			d3.selectAll("circle")
				.transition()
				.duration(1500)
				.ease("quad-in-out")
				.attr("cy", function() {
					var temp = generateRandom()[1];
					return temp
				})
				.attr("cx", function() {
					var temp = generateRandom()[0];
					return temp
				})
				.attr("r", function() {return Math.random()*window.innerWidth/20})
				.style("fill", "#39A9ED")
				.style("stroke", "#39A9ED")
				.style("opacity", 0.07);
		}
		
	},
	parallaxMovement: function (s, elems) {
		var sStart = s.offset().top
			, sEnd = sStart + s.outerHeight(true)
			, cPos = $(window).scrollTop()
			, dy = (cPos - sStart) / 4
		if (cPos >= sStart && cPos <= sEnd) {
			elems.css({
				"transform": "translate3d(0, " +dy+ "px, 0)",
				"-webkit-transform-style": "preserve-3d",
			});
		} 
	},
	 
	drawMatrix: function(hero) {
		var side = Math.min(window.innerHeight, window.innerWidth) / 2;
		var spaceScaleX = d3.scale.linear().domain([0, hero.components[0].mtx.length - 1]).range([(window.innerWidth - side)/2, (window.innerWidth - side)/2 + side]),
			spaceScaleY = d3.scale.linear().domain([0, hero.components[0].mtx.length - 1]).range([(window.innerHeight - side)/2, (window.innerHeight - side)/2 + side]);
		var k = 0;
		for (var index in hero.components) {
			for (var j = 0; j < hero.components[index].mtx.length; ++j) {
				for (var i = 0; i < hero.components[index].mtx.length; ++i) {
					if (hero.components[index].mtx[j][i] == 1) {
						d3.select(parts[0][k])
							.transition()
							.duration(2000)
							.ease("quad-in-out")
							.attr("cx", spaceScaleX(i))
							.attr("cy", spaceScaleY(j))
							.attr("r", function() { return side/hero.components[index].mtx.length/1.4})
							.style("fill", hero.components[index].color)
							.style("stroke", hero.components[index].color)
							.style("opacity", 0.8);
						k += 1;
					}
				}
			}
		}
		if (k > 0) {
			for (var i = k; i < dotsAmount; ++i) {
				d3.select(parts[0][i])
							.transition()
							.duration(2000)
							.attr("cy", function() {return Math.random()*window.innerHeight})
							.attr("cx", function() {return Math.random()*window.innerWidth})
							.style("fill", "#39A9ED")
							.style("stroke", "#39A9ED")
							.style("opacity", 0.2)
							.attr("r", 0)
			}
		}
	},
	resizeWindow: function() {
		layout.runChaos('!center');
	},
	showText: function(arr) {
		$('.clearIt').addClass('animated fadeOutLeft');
		var a = arr.pop();
		$(a).addClass('clearIt animated fadeInRight');
	},
	comapctDots: function() {
		d3.selectAll("circle")
			.transition()
			.duration(1500)
			.ease("quad-in-out")
			.attr("cy", function() {return Math.random()*window.innerHeight})
			.attr("cx", function() {return Math.random()*window.innerWidth})
			.attr("r", 0)
			.style("fill", "#39A9ED")
			.style("stroke", "#39A9ED")
			.style("opacity", 0.2);
	},
	resetTransition: function() {
		$(".intro-svg").attr("class", "intro-svg no-transition");
	},
	heroDelay: 4500
};

var textArr = []

$('.introduction-text').each(function() {
	textArr.push(this);
});

var movie = [
	function() {
		layout.runChaos();
	},
	function() {
		layout.showText(textArr);
		layout.drawMatrix(AgileTXT);
	},
	function() {
		layout.runChaos();
	},
	function() {
		layout.showText(textArr);
		layout.drawMatrix(CITxt);
	},
	function() {
		layout.runChaos();
	},
	function() {
		layout.showText(textArr);
		layout.drawMatrix(RND);
	},
	function() {
		layout.showText(textArr)
		layout.comapctDots();
	},
	function() {
		layout.runChaos('!center');
		$('.intro-buttons').addClass("animated fadeInUpBig");
		$('.intro-logo').addClass("animated fadeInDownBig");
	},
	function() {
		layout.resetTransition();
	}
]
var timing = [0]
var gap = 1500;
var timingCurrent = 0;
for (var i = 1; i < movie.length; ++i) {
	if (i % 2 == 1) {
		timing.push(timingCurrent += gap)
	} else {
		timing.push(timingCurrent += layout.heroDelay)
	}
}

for (var i = 0; i < movie.length; ++i) {
	setTimeout(movie[i], timing[i]);
}

module.exports = layout;
