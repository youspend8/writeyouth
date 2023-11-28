(function execPageCommunityWrite() {
  if (location.pathname !== '/community/write') {
    return
  }
  class FormAttributes {
    files = []
    memo = ''
    storage = ''
    cycle = 0

    addFiles(files) {
      this.files = [
        ...this.files,
        ...files
      ]
    }

    removeFiles(index) {
      const newFiles = [ ...this.files ]
      newFiles.splice(index, 1)
      this.files = newFiles
    }
  }

  const formAttributes = new FormAttributes();
  const writeForm = document.querySelector('#write_form')

  function removeFile(index, element) {
    formAttributes.removeFiles(index)
    element.parentElement.remove()
    setInputFiles()
  }

  function setInputFiles() {
    const { files } = formAttributes
    const dataTransfer = new DataTransfer()
    files.forEach((file) => dataTransfer.items.add(file))
    imageUploader.files = dataTransfer.files
  }

  function mountStageItems() {
    const { files } = formAttributes
    const stage = document.querySelector('.__image_uploader > .__stage')
    stage.innerHTML = ''
    files.forEach((file, index) => {
      const reader = new FileReader()
      reader.readAsDataURL(file)
      reader.onload = () => {
        const element = `
      <div class="__stage_item">
        <img src="${reader.result}" alt="임시이미지${index}" />
        <button class="__remove" type="button" style="display: flex;" onclick="removeFile(${index}, this)">
          <img class="__close_icon" src="/uploads/icons/delete.png" alt="제거아이콘">
          <label>제거</label>
        </button>
      </div>
    `
        stage.innerHTML += element
      }
    })
    setInputFiles()
  }

  // window.switchMode = switchMode
  window.removeFile = removeFile
  window.setInputFiles = setInputFiles
  window.mountStageItems = mountStageItems

  const imageUploader = document.getElementById('__uploader_button')
  imageUploader.onchange = e => {
    const files = [ ...imageUploader.files ]
    formAttributes.addFiles(files)
    mountStageItems()
  }

  writeForm.onsubmit = e => {
    e.preventDefault()
    const formData = new FormData()
    const { files } = formAttributes
    const { memo, storage, cycle } = e.target
    formData.append('memo', memo.value)
    formData.append('storage', storage.value)
    formData.append('cycle', `${cycle.value}`)
    files.forEach(file => formData.append('files', file))
    fetch('/api/v1/community', {
      method: 'post',
      body: formData
    }).then(response => {
      if (response.ok) {
        window.location.href = response.headers.get('Location')
      }
    })
  }
})();

(async function execPageCommunityEdit() {
  const { pathname } = location
  if (!pathname.startsWith('/community/edit')) {
    return
  }
  class FormAttributes {
    originFiles = []
    removedFiles = []
    addedFiles = []

    removeFiles(index) {
      const newFiles = [ ...this.addedFiles ]
      newFiles.splice(index, 1)
      this.addedFiles = newFiles
    }
  }
  const formAttributes = new FormAttributes()
  function removeFile(id, element) {
    formAttributes.removedFiles.push(id)
    element.parentElement.remove()
  }

  function removeFileIndex(index, element) {
    formAttributes.removeFiles(index)
    element.parentElement.remove()
    setInputFiles()
  }

  const id = pathname.substring(pathname.lastIndexOf('/') + 1)
  await fetch(`/api/v1/community/${id}`, {
    method: 'get',
  }).then(response => response.json())
    .then(data => {
      const container = document.querySelector('.__community_write')
      const { _id, memo, storage, createdAt, cycle, user, files } = data
      formAttributes.originFiles = files
      container.querySelector('#memo').value = memo
      container.querySelector('#storage').value = storage
      container.querySelector(`#month${cycle}`).checked = true
      container.querySelector('.__image_uploader .__stage').innerHTML = files.map((file, index) => {
        return `
          <div class="__stage_item">
            <img src="https://writeyouth.s3.ap-northeast-2.amazonaws.com/${file}" alt=이미지${index}" />
            <button class="__remove" type="button" style="display: flex;" onclick="removeFile('${file}', this)">
              <img class="__close_icon" src="/uploads/icons/delete.png" alt="제거아이콘">
              <label>제거</label>
            </button>
          </div>
        `
      }).join('')
    })
  const writeForm = document.querySelector('#write_form')
  const imageUploader = document.getElementById('__uploader_button')
  imageUploader.onchange = e => {
    formAttributes.addedFiles = [
      ...formAttributes.addedFiles,
      ...imageUploader.files
    ]
    mountStageItems()
  }
  writeForm.onsubmit = e => {
    e.preventDefault()
    const formData = new FormData()
    const { originFiles, removedFiles, addedFiles } = formAttributes
    const { memo, storage, cycle } = e.target
    formData.append('memo', memo.value)
    formData.append('storage', storage.value)
    formData.append('cycle', `${cycle.value}`)
    originFiles.forEach(file => formData.append('originFiles', file))
    removedFiles.forEach(file => formData.append('removedFiles', file))
    addedFiles.forEach(file => formData.append('files', file))
    fetch(`/api/v1/community/${id}`, {
      method: 'put',
      body: formData
    }).then(response => response.json())
      .then(data => {
      if (data) {
        console.log('data', data)
        window.location.href = `/community/${data._id}`
      }
    })
  }

  function setInputFiles() {
    const { addedFiles } = formAttributes
    const dataTransfer = new DataTransfer()
    addedFiles.forEach((file) => dataTransfer.items.add(file))
    imageUploader.files = dataTransfer.files
  }

  function mountStageItems() {
    const { originFiles, addedFiles } = formAttributes
    const stage = document.querySelector('.__image_uploader > .__stage')
    stage.innerHTML = ''
    originFiles.forEach((file, index) => {
      const element = `
        <div class="__stage_item">
          <img src="https://writeyouth.s3.ap-northeast-2.amazonaws.com/${file}" alt="임시이미지${index}" />
          <button class="__remove" type="button" style="display: flex;" onclick="removeFile('${index}', this)">
            <img class="__close_icon" src="/uploads/icons/delete.png" alt="제거아이콘">
            <label>제거</label>
          </button>
        </div>
      `
      stage.innerHTML += element
    })
    addedFiles.forEach((file, index) => {
      const reader = new FileReader()
      reader.readAsDataURL(file)
      reader.onload = () => {
        const element = `
          <div class="__stage_item">
            <img src="${reader.result}" alt="임시이미지${index}" />
            <button class="__remove" type="button" style="display: flex;" onclick="removeFileIndex('${index}', this)">
              <img class="__close_icon" src="/uploads/icons/delete.png" alt="제거아이콘">
              <label>제거</label>
            </button>
          </div>
        `
        stage.innerHTML += element
      }
    })
    setInputFiles()
  }

  window.removeFile = removeFile
  window.setInputFiles = setInputFiles
  window.mountStageItems = mountStageItems
  window.removeFileIndex = removeFileIndex
})();

(function execPageCommunityList() {
  const { pathname, hash } = location
  if (pathname !== '/community') {
    return
  }
  const buttonMy = document.querySelector('.__inner_header_button.__filter.__my')
  const buttonAll = document.querySelector('.__inner_header_button.__filter.__all')
  if (buttonMy) {
    buttonMy.onclick = () => {
      buttonAll.style.display = 'block'
      buttonMy.style.display = 'none'
      location.href = '/community#my'
    }
  }
  if (buttonAll) {
    buttonAll.onclick = () => {
      buttonAll.style.display = 'none'
      buttonMy.style.display = 'block'
      location.href = '/community#all'
    }
  }
  let url = `/api/v1/community`
  if (hash && hash === '#my') {
    buttonAll.style.display = 'block'
    buttonMy.style.display = 'none'
    url += '?my=true'
  }
  fetch(url, {
    method: 'get',
  }).then(response => response.json())
    .then(items => {
      document.querySelector('.__inner_main .__no_content').style.display = 'none'
      const html = items.map(item => {
        const { _id, user, createdAt, files } = item
        const { avatarUrl, name } = user
        return `
          <a class="__card_item __community_card_item" href="/community/${_id}">
            <div class="__card_wrapper">
              <div class="__user">
                <div class="__profile">
                  <img crossOrigin="anonymous" src="${avatarUrl}" alt="">
                </div>
                <p class="__username">${name}</p></div>
              <div class="__thumbnail">
              ${files && files.length !== 0 ? `
                <img src="https://writeyouth.s3.ap-northeast-2.amazonaws.com/${files[0]}" alt="대표이미지">
              ` : `
                <img src="/uploads/home/main2.png" alt="대표이미지">
              `}
              </div>
              <div class="__created_at">${getFormattedDateTime(createdAt)}</div>
            </div>
          </a>`
      }).join('')
      const list = document.querySelector('.__inner_main > .grid')
      list.innerHTML = html
      if (items.length === 0) {
        document.querySelector('.__inner_main .__no_content').style.display = 'flex'
      }
    })
  onhashchange = () => execPageCommunityList()
})();

(async function execPageCommunityDetail() {
  const { pathname } = location
  if (!pathname.startsWith('/community/') || pathname.startsWith('/community/edit')) {
    return
  }
  const id = pathname.substring(pathname.lastIndexOf('/') + 1)
  await fetch(`/api/v1/community/${id}`, {
    method: 'get',
  }).then(response => response.json())
    .then(data => {
      const container = document.querySelector('.__community_detail')
      const { _id, memo, storage, createdAt, user, files } = data
      const { avatarUrl, name } = user
      container.querySelector('.__user .__profile img').src = avatarUrl
      container.querySelector('.__user .__username').innerHTML = name
      container.querySelector('.__user .__created_at').innerHTML = getFormattedDateTime(createdAt)
      container.querySelector('.__text').innerHTML = memo
      container.querySelector('.__emotion.good .__count').innerHTML = data.good || 0
      container.querySelector('.__emotion.moved .__count').innerHTML = data.moved || 0
      container.querySelector('.__emotion.cheer .__count').innerHTML = data.cheer || 0
      container.querySelector('.__emotion.sad .__count').innerHTML = data.sad || 0
      container.querySelector('.swiper .swiper-wrapper').innerHTML = files.map(file => {
        return `
          <div class="swiper-slide">
            <img src="https://writeyouth.s3.ap-northeast-2.amazonaws.com/${file}" />
          </div>
        `
      }).join('')
    })
  const swiper = new Swiper('.swiper', {
    loop: true,
    pagination: {
      el: '.swiper-pagination',
    },
    navigation: {
      nextEl: '.swiper-button-next',
      prevEl: '.swiper-button-prev',
    },
  });
  const deleteButton = document.querySelector('.__icon.__delete')
  const editButton = document.querySelector('.__icon.__edit')
  if (deleteButton) {
    deleteButton.onclick = e => {
      if (confirm('해당 유언장을 삭제하시겠습니까?')) {
        fetch(`/api/v1/community/${id}`, {
          method: 'DELETE',
        }).then(response => {
          if (response.status === 200) {
            alert('유언장 삭제가 성공적으로 처리 되었습니다.')
            location.href = '/community'
          } else if (response.status === 403) {
            alert('비정상적인 접근입니다.')
          } else {
            alert('오류가 발생했습니다. 관리자에게 문의 바랍니다.')
          }
        })
      }
    }
  }
  if (editButton) {
    editButton.onclick = e => {
      location.href = `/community/edit/${id}`
    }
  }
  const emotions = document.querySelectorAll('.__emotions .__emotion .__description')
  Array.from(emotions).forEach(emotion => {
    emotion.onclick = e => {
      if (getCookie(`emotion_${id}`)) {
        alert('이미 감정표현을 남겼습니다.')
        return
      }
      const type = e.target.dataset.type
      fetch(`/api/v1/community/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          emotion: type
        })
      }).then(response => response.json())
        .then(data => {
          const container = document.querySelector('.__community_detail')
          container.querySelector(`.__emotion.${type} .__count`).innerHTML = data[type]
          setCookie(`emotion_${id}`, true, 1)
        })
    }
  })
})();

(async function execPageMyCommunityList() {
  const { pathname } = location
  if (!pathname.startsWith('/users/community')) {
    return
  }
  fetch(`/api/v1/community?my=true`, {
    method: 'get',
  }).then(response => response.json())
    .then(items => {
      document.querySelector('.__inner_main .__no_content').style.display = 'none'
      const html = items.map(item => {
        const { _id, user, createdAt, files } = item
        const { avatarUrl, name } = user
        return `
        <a class="__card_item __community_card_item" href="/community/${_id}">
          <div class="__card_wrapper">
            <div class="__user">
              <div class="__profile">
                <img crossOrigin="anonymous" src="${avatarUrl}" alt="">
              </div>
              <p class="__username">${name}</p></div>
            <div class="__thumbnail">
            ${files && files.length !== 0 ? `
              <img src="https://writeyouth.s3.ap-northeast-2.amazonaws.com/${files[0]}" alt="대표이미지">
            ` : `
              <img src="/uploads/home/main2.png" alt="대표이미지">
            `}
            </div>
            <div class="__created_at">${getFormattedDateTime(createdAt)}</div>
          </div>
        </a>`
      }).join('')
      const list = document.querySelector('.__inner_main > .grid')
      list.innerHTML = html
      if (items.length === 0) {
        document.querySelector('.__inner_main .__no_content').style.display = 'flex'
        return
      }
    })
})();

function getCookie(cookieName) {
  let x, y;
  let val = document.cookie.split(';');
  for (let i = 0; i < val.length; i++) {
    x = val[i].substr(0, val[i].indexOf('='));
    y = val[i].substr(val[i].indexOf('=') + 1);
    x = x.replace(/^\s+|\s+$/g, ''); // 앞과 뒤의 공백 제거하기
    if (x == cookieName) {
      return unescape(y); // unescape로 디코딩 후 값 리턴
    }
  }
}

function setCookie(cookieName, value, days) {
  const expiry = new Date();
  expiry.setDate(expiry.getDate() + days);
  const cookie = escape(value) + ((days == null) ? '' : '; expires=' + expiry.toUTCString());
  document.cookie = cookieName + '=' + cookie;
}

function getFormattedDateTime(dateTime) {
  const splits = dateTime.split('T')
  const date = splits[0].replaceAll('-', '. ')
  const time = splits[1].split('.')[0]
  return `${date}`
}
