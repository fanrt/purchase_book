(function(win, doc) {
	/***************************************************************************
	 * 信息提示组件formDesign v1.0
	 * 
	 * @param container 内容容器(必填)
	 * @param opt 其他参数
	 */
	function formDesign(container, opt) {
		this.sde = {};
		this.mode = opt.mode;
		this.container = container;
		this.saveUrl = opt.saveUrl;
		this.initFormId = opt.initFormId;
		this.saveFinish = opt.saveFinish;
		this.loadSuccess = opt.loadSuccess;
		this.saveTempletUrl = opt.saveTempletUrl;
		
		if (!opt.title) {this.title = '';} else {this.title = opt.title;}
		if (!opt.footer) {this.footer = '';} else {this.footer = opt.footer;}
		if (!opt.width) {this.width = 650;} else {this.width = opt.width;}
		if (!opt.iframeJs) {this.iframeJs = '';} else {this.iframeJs = opt.iframeJs;}
		if (!opt.iframeCss) {this.iframeCss = '';} else {this.iframeCss = opt.iframeCss;}
		if (!opt.printTitle) {this.printTitle = '';} else {this.printTitle = opt.printTitle;}
		if (!opt.openToolbar) {this.openToolbar = '';} else {this.openToolbar = opt.openToolbar;}
		
		window.SDE_EXT_COMPONENTS = {
			confirm: function(msg, _success, _error) {
				if (confirm(msg)) {_success()} else {_error()}
			},
			alert: function(msg, success) {alert(msg);success();}
		}
		
		if (this.mode == "DESIGN") {
			this.design();
		} else {
			this.editOrReadOnly();
		}
	}

	formDesign.prototype.design = function() {
		var self = this;
		var toolbarext = [ {
			name: "sde-toolbar-records", //在这里添加
			init: function() {
				var btn = document.createElement('div');
				btn.className = 'tab-content-item-panel';
				btn.innerHTML = ' <div class="tab-content-item-panel-label">操作</div>'
						+ '<div class="tab-content-item-panel-content">'
						+ '<div style="float:left;">'
						+ '<div id="btn_save" class="tab-content-item-panel-content-control" title="保存">'
						+ '<div class="sde-icon sde-icon-emrdesign" style="width: 64px;height: 32px;"></div>'
						+ '<div style="text-align: center;">保存</div>'
						+ ' </div>'
						+ ' </div>'
						+ '<div style="float:left;">'
						+ '<div id="btn_full" class="tab-content-item-panel-content-control" title="全屏">'
						+ '<div class="sde-icon sde-icon-emrdesign" style="width: 64px;height: 32px;"></div>'
						+ '<div style="text-align: center;">全屏</div>'
						+ ' </div>'
						+ ' </div>' + '</div>' + '</div>';
				return btn;
			}
		} ];
		
		sde = new SDE({
			id: self.container,
			title: self.title,
			footer: self.footer,
			width: self.width,//650
			open_toolbar: self.openToolbar,//'sde-toolbar-records', // 默认打开的工具栏
			toolbars: {
				'sde-toolbar-editor': ['history', 'clipboard', 'fonts', 'paragraphs'],
	            'sde-toolbar-insert': ['horizontal', 'spechars', 'link', 'map', {'img': ['insertimage']}, 'code', 'table', 'formula', 'comment'],
	            'sde-toolbar-tables': ['table', 'blockmergecells', 'alignmergecells'],
	            'sde-toolbar-views': ['directory', 'showcomment', 'preview'],
	            'sde-toolbar-tools': ['drafts', 'print', 'searchreplace', 'wordcount'],
	            'sde-toolbar-records': ['sdetemplate', 'sdecontrols']
			},
			toolbar_plugins: toolbarext,
			ready: function() {
				var sdeHeight = $('.designContainer').height();
				$('.sde-editor').css({height: sdeHeight});
				$('#edui69_iframeholder').css({height: sdeHeight - 250});

				// 保存
				$('#btn_save').click(function() {
					var params = common.serializeObject($('#saveForm'));
					params.caseDocContent = self.sde.html();
					$.post(self.saveTempletUrl, params,
						function(result) {
							if (result.code != "0") {
								common.alert(result.msg,0);
							}
						}, 'json').error(function(e) {jqueryPostError(e)});
				});
	
				//全屏
				$('#btn_full').click(function() {
					alert('待开发')
				});
				
				if (self.loadSuccess && typeof FunName === "function") {
					self.loadSuccess();
				}
			},
			print: {
				title: self.printTitle,
				header: function(index, count, page) {
					var h = document.createElement('div')
					h.style.backgroundColor = "red"
					h.innerHTML = 'header:<br/>Page ' + (index + 1) + ' <br/>of ' + count
					return h;
				},
				footer: function(index, count, page) {
					var f = document.createElement('div')
					f.innerHTML = 'footer:<br/>Page ' + (index + 1) + ' <br/>of ' + count
					return f;
				},
				height: 1142,
				header_height: 100,
				footer_height: 45
			},
			mode: self.mode,//EDITOR、DESIGN、READONLY
			iframe_css_src: self.iframeJs,
			iframe_js_src: self.iframeCss
		});
		this.sde = sde;
	}
	
	formDesign.prototype.editOrReadOnly = function() {
		var self = this;
		sde = new SDE({
			id: self.container,
			title: self.title,
			footer: self.footer,
			width: self.width,
			open_toolbar: self.openToolbar,//'sde-toolbar-records', // 默认打开的工具栏
			toolbars: {},
			toolbar_plugins : '',
			ready: function() {
				$('.sde-header').hide();
				
				var sdeHeight = $('.designContainer').height();
				$('.sde-editor').css({height: sdeHeight + 103});
				$('#edui69_iframeholder').css({height: sdeHeight});
				
				// 初始化控制值
				$('#' + self.initFormId).find("input[type='hidden']").each(function (i){
					sde.setControl({ID: this.id, VALUE: (this.value == "" ? "" : this.value)});
				});
				
				if (self.loadSuccess && typeof FunName === "function") {
					self.loadSuccess();
				}
			},
			mode: self.mode,//EDITOR、DESIGN、READONLY
			iframe_css_src: self.iframeJs,
			iframe_js_src: self.iframeCss
		});
		this.sde = sde;
	}
	
	formDesign.prototype.save = function() {
		var self = this;
		if (!self.saveUrl) {return ;}
		self.sde.checkControl({
			id:"",
			error:function(obj){
				console.log(obj);
			},
			success:function(){
			// 移除之前校验错误的提示信息
			self.sde.unCheckControl();
			
			var params = {};
			$.each(sde.getControl(), function(i){
				params[this.NAME] = this.VALUE;
			});

			$.post(self.saveUrl, params, function (result){
				self.saveFinish(result);
			}, 'json').error(function (e){jqueryPostError(e)});}
		}, true);
	}
	win.formDesign = formDesign;
})(window, document);