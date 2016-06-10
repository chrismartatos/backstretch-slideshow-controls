/*----------------------------------------------------------------
		DOM ready
----------------------------------------------------------------*/
$(function()
{
	backstretch_slideshow();
});

/*----------------------------------------------------------------
		Fullscreen Gallery
----------------------------------------------------------------*/
function backstretch_slideshow()
{
	//Target gallery
	var $gallery = $("#backstretch-gallery");
	
	//If gallery exist
	if($gallery.length)
	{	
		
		//Target and create array
		var	$items = $gallery.find("figure"),
			$body = $("body"),
			$preloader = $("#preloader"),
			$window = $(window),
			$get_images = new Array();
		
		//Build the controls
		controls_init($items);
		    
		//Show css preloader
		$preloader.show();
		
		//Find images and push array
		$items.each(function(i)
		{ 
			$get_images.push($(this).attr("data-image")); 
		});
		
		//Backstretch slideshow init
		$body.backstretch($get_images,{
			duration: 5000, 
			fade: 600
		});
				
		//When images are ready
		$body.on("backstretch.show", function()
		{ 
			//Hide preloader
			$preloader.fadeOut();
		});
		
		
		//Controls: target Bullet Nav from: controls_init()
		var $controls = $("#control-nav a");
		
		//Event for controls
		$controls.click(function(e)
		{
			e.preventDefault();
			
			var $index = $(this).attr("data-index");  
			
			$body.backstretch("show", $index);
			
			$controls.removeClass("current");
			 
			$(this).addClass("current");
			
			return false;
		});
		
		//Next
	   $("#next").click(function(e)
       {
         e.preventDefault();
        
         $body.backstretch("next");;
         
         return false;
       });
      
       //Prev
       $("#prev").click(function(e)
       {
         e.preventDefault();
         
         $body.backstretch("prev");
		 
		 return false;
       });
		
		//Active class for controls when the slide is changing after
		$body.on("backstretch.after", function (e, instance, index) 
		{			  		  
		  //Remove class
		  $controls.removeClass("current");
		  
		  $controls.eq(index).addClass("current");
		  
		  //Add Active class and use css to target and play with transitions: look css (delete if you like)
		  $body.find(".backstretch").addClass("active");
		});
		
		//Remove active class from backstretch for css transitions (delete if you like)
		$body.on("backstretch.before", function(e, instance, index) 
		{	
			 //Play with css3 transitions: look css		    	 	 		
		  	 $body.find(".backstretch").removeClass("active"); 
		});
		
	}
}

/*----------------------------------------------------------------
		 Build Controls
----------------------------------------------------------------*/
function controls_init($items)
{
	var _controls = $('<div id="control-nav"></div>');
	
	$("#content").append(_controls);
	
	for(i=0; i<$items.length; ++i)
	{
		var elements = '<a class="control" data-index="'+i+'"><span></span></a>';
		
		_controls.append(elements);
	}
	
	return _controls;
}
