document.addEventListener('DOMContentLoaded',()=>{
	//获取元素节点
	let loginBox = document.querySelector('.login');
	let loginBtn = document.querySelector('#loginBtn');
	let hint = document.querySelector('#hint');
	let code = document.querySelector('.code');
	let aspan = code.getElementsByTagName('span');
	let incode = document.querySelector('#incode');
	let show = document.querySelector('#show');
	let NPhint = document.querySelector('#NPhint');
	let picCode = document.querySelector('#picCode');
	var isok1 = false;
	var isok2 = false;
	
	incode.onblur = ()=>{
		verifyPicCode();
	}

	loginBtn.onclick = ()=>{
		login();
	}

	loginBox.onkeyup = (e)=>{
		e = e || window.evnent;
		if(e.keyCode == 13){
			console.log('enter');
			verifyPicCode();
			login();
		}
	}

	function login(){
		let _username = document.querySelector('#username').value;
		let _password = document.querySelector('#password').value;
		if(_username && _password){
			if(isok2){
				var xhr = new XMLHttpRequest();
				xhr.onload = ()=>{
					var res = JSON.parse(xhr.responseText);
					if(res.code == 0){
						NPhint.className ="";
						Cookie.set('adminName',_username);
						location.href = './center.html';
					}else{
						NPhint.innerHTML = '用户名或密码错误';
						NPhint.className = 'show layui-icon layui-icon-close-fill';
					}
				}
				xhr.open('post','/login',true);
				xhr.setRequestHeader('Content-Type','application/x-www-form-urlencoded');
				xhr.send(`username=${_username}&password=${_password}`);
				
			}else{
				hint.className = 'show layui-icon layui-icon-close-fill';
				incode.focus();
			}
		}else{
			NPhint.innerHTML = '用户名和密码不能为空';
			NPhint.className = 'show layui-icon layui-icon-close-fill';
		}
	}

	function verifyPicCode(){
		let incodeV = incode.value.trim().toLowerCase();
		var res='';
		for(let i=0;i<aspan.length;i++){
			res += aspan[i].innerText.toLowerCase();
		}
		if(incodeV==res){
			hint.className="";
			isok2 = true;
		}else{
			hint.className = 'show layui-icon layui-icon-close-fill';
			isok2=false;
		}
	}
	
	//验证码更新函数
	function createPicCode() {
		for(i = 0; i < 4; i++) {
			var html = randomNum();
			var color = randomColor(16);
			var foWeight = randomNumber(500, 700);
			var foSize = randomNumber(20, 30);
			picCode.children[i].innerHTML = html;
			picCode.children[i].style.color=color;
			picCode.children[i].style.fontWeight=foWeight;
			picCode.children[i].style.fontSize=foSize;
		}
	}
	//初始化验证码
	createPicCode();
	//点击更新验证码
	picCode.onclick=(e)=>{
		createPicCode();
		e.preventDefault();
	}
})
