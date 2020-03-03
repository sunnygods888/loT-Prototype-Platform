<?php
// Update this to bust cache
define(APP_VER_NUMBER, 3.0);

define(DISABLE_DESIGN_CREDIT, false);

function get_version(){
	return APP_VER_NUMBER;
}

// Echo .active if current page name is same as page passed to function
// Used in nav.php, mostly
function get_active_nav_item($thispage = 'dashboard.php') {
	$currentpage = basename($_SERVER['PHP_SELF']);
	if($currentpage == $thispage){
		echo ' active';
	}
}

// Show Credits and Copyrights
function jdm_credit() {
	$randnumber = rand(1,5);
	
	switch ($randnumber) {
		case 1:
			$jdmcredit = 'Crafted with <i class="fa fa-heart"></i> by <a class="font-w600" href="https://jdmdigital.co" target="_blank">JDM Digital</a>';
			break;
			
		case 2:
			$jdmcredit = 'Built with <i class="fa fa-poo-storm"></i> by <a class="font-w600" href="https://jdmdigital.co" target="_blank">JDM Digital</a>';
			break;
			
		case 3:
			$jdmcredit = 'Designed with <i class="fa fa-coffee"></i> by <a class="font-w600" href="https://jdmdigital.co" target="_blank">JDM Digital</a>';
			break;
			
		case 4:
			$jdmcredit = 'Obsessed over with <i class="fa fa-beer"></i> by <a class="font-w600" href="https://jdmdigital.co" target="_blank">JDM Digital</a>';
			break;
		
		default:
			$jdmcredit = 'Crafted with <i class="fa fa-heart"></i> by <a class="font-w600" href="https://jdmdigital.co" target="_blank">JDM Digital</a>';
			
		
	}
	
	if(!DISABLE_DESIGN_CREDIT) {
		echo '
		<div class="row font-size-sm">
                        <div class="col-sm-6 order-sm-2 mb-1 mb-sm-0 text-center text-sm-right">
                            '.$jdmcredit.' 
                        </div>
                        <div class="col-sm-6 order-sm-1 text-center text-sm-left">
                            <a class="font-w600" href="https://performancescoring.com" target="_blank">Performance Scoring, LLC</a> &copy; <span data-toggle="year-copy"></span>
                        </div>
                    </div>
		';
	} else {
		echo '
		<div class="row font-size-sm">
                        <div class="col-sm-12 text-center">
                            <a class="font-w600" href="https://performancescoring.com" target="_blank">Performance Scoring, LLC</a> &copy; <span data-toggle="year-copy"></span>
                        </div>
                    </div>
		';
	}
	
	
}