/**
 * @license Copyright (c) 2003-2021, CKSource - Frederico Knabben. All rights reserved.
 * For licensing, see https://ckeditor.com/legal/ckeditor-oss-license
 */

CKEDITOR.editorConfig = function( config ) {
	// Define changes to default configuration here. For example:
	// config.language = 'fr';
	// config.uiColor = '#AADC6E';
	// config.extraPlugins = 'codesnippet';
	config.skin = "moono-lisa";
	config.codeSnippet_theme = 'mono-blue';
	// config.codeSnippet_languages = {
	// 	javascript: 'JavaScript',
	// 	php: 'PHP'
	// };
	config.height = '450px';
	config.toolbarCanCollapse = true;

	config.toolbarStartupExpanded = false;
	config.removePlugins = 'elementspath';


};
