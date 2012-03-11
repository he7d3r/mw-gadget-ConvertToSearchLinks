/*
 * This function replaces the "original expression" of each rule by a link
 * to search for ocurrences of that expression on wiki pages
 */
var convertToSearchLinks = function (){
	var	$list = $('#bodyContent').find('li'),
		ruleSyntax = /^\s*(\S[^:]*?)\s*:\s*([\S].*?)\s*(?:\/\/.*?)?$/;

	$list.each(function(){
		var $item = $(this),
			searchURL = mw.util.wikiGetlink( 'Special:Search' ) + '?fulltext=1&search="';
		// Current syntax: * old word : new word //Some optional comment
		var match = ruleSyntax.exec( $item.text() );
		if( match && match[1] && match[2]) {
			$item.html( function( index, oldhtml ){
				var link = mw.html.element(
						'a', {
							href: searchURL + match[1] + '"' ,
							title: 'Pesquisar ocorrências deste termo na wiki'
						}, match[1]
					),
					newRule = link + ': ' + match[2] + ' ' + match[3];
				return oldhtml.replace( ruleSyntax,	newRule);
			});
		}
	});
};

if ( $.inArray( mw.config.get('wgPageName'),
	[
		'Wikipédia:Dicionário',
		'Wikipédia:Dicionário/pt-AO',
		'Wikipédia:Dicionário/pt-BR',
		'Wikipédia:Dicionário/pt-PT',
		'Wikisource:Modernização/Dicionário',
		'Wikisource:Modernização/Dicionário/pt-BR',
		'Wikisource:Modernização/Dicionário/pt-PT'
	] ) !== -1 ) {
	mw.loader.load(
		'//pt.wikibooks.org/w/index.php?title=User:Helder.wiki/Tools/LanguageConverter.js/LevenshteinDistance.js&action=raw&ctype=text/javascript&smaxage=21600&maxage=86400'
	);
	var portletLink = mw.util.addPortletLink( 'p-cactions', '#', 'Convert to search links',
		'ca-convert-to-search', 'Replace the left hand side of each convertion rule by a link to the search page'
	);
	$(portletLink).click( function( e ) {
		e.preventDefault();
		convertToSearchLinks();
	});
}