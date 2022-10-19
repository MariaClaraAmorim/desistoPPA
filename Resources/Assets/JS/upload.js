const form = document.querySelector("form"),
  fileInput = document.querySelector(".file-input"),
  progressArea = document.querySelector(".progress-area"),
  uploadedArea = document.querySelector(".uploaded-area"),
  fileUpload = document.querySelector(".file-upload");

/**
 * @type {HTMLImageElement}
 */
const iconInputFile = document.querySelector("div.chat-input>div>form>img");

fileUpload.addEventListener("click", () => {
  fileInput.click();
});

fileInput.addEventListener("change", handleUpload);

function getNameFile(file) {
  const name = file.name;

  if (name.length >= 12) {
    const splitName = name.split(".");
    return splitName[0].substring(0, 13) + "... ." + splitName[1];
  }
  return name;
}

function handleUpload({ target }) {
  // console.log(target);
  const file = target.files[0];
  if (!file) return;

  const fileName = getNameFile(file);
  let reader = new FileReader();
  reader.readAsDataURL(file);

  reader.addEventListener("load", async () => {
    //Busca a extensão do anexo
    let typeName = file.type;
    const ext = typeName.split("/").pop();
    if (iconInputFile) {
      iconInputFile.setAttribute("hidden", "");
    }
    await upload(ext, file);
  });

  reader.addEventListener("progress", ({ loaded, total }) => {
    successUpload(fileName, file.size);
  });

  reader.addEventListener("error", () => {
    console.error(reader.error);
  });
}

async function upload(ext, file) {
  let validate = validateExtension(ext, file);
  let sizeUpload = sizeFile(file);

  if (sizeUpload == false || validate == false) {
    if (validate == false) {
      alert("Não é possível fazer upload desse arquivo!");
    } else if (sizeUpload == false) {
      alert("Arquivo muito grande, máximo 5 MB!");
    }

    clearData();
    return;
  }
}

// Função responsável por verificar o tamanho no anexo
function sizeFile(file) {
  let size = file.size;
  const fileTotal = Math.floor(size / 1000);

  if (fileTotal > 5000) return false;
  return true;
}

// Função responsável por buscar a extensão do anexo e retornar a função de erro caso seja música ou vídeo
function validateExtension(ext, file) {
  let extensionsValids = ["jpg", "png", "gif", "jpeg"];
  if (extensionsValids.indexOf(ext) > -1) {
    return true;
  } else {
    return false;
  }
}

function onprogressUpload(name, loaded) {
  progressArea.innerHTML = `<li class="row">
    <div class="content">
      <div class="detalhesUpload">
        <span class="name">${name} • Carregando </span>
        <span class="percent">${loaded}%</span>
      </div>
      <div class="progress-bar">
        <div class="progress" style="width: ${loaded}%"></div>
      </div>
    </div>
  </li>`;
}

function successUpload(name, size) {
  const fileTotal = Math.floor(size / 1000);
  const sizeFormat =
    size < 1024 ? fileTotal + " KB" : (size / (1024 * 1024)).toFixed(2) + " MB";

  progressArea.innerHTML = "";
  uploadedArea.classList.remove("onprogress");

  let novoNome = name.substr(0, 10);
  uploadedArea.insertAdjacentHTML(
    "afterbegin",
    `<li class="row">
          <div class="content upload">
            <div class="detalhesUpload">
              <span class="name"><img class="iconeFile" src="/Resources/Assets/Imagens/IconeFile.png" alt="Icone File">
              <class="titleUpload" title="${name}"> ${novoNome}... • Upload feito com sucesso <img class="iconeCheck" src="/Resources/Assets/Imagens/IconeCheck.png" alt="Icone Check"></span>
              <span class="size">${sizeFormat}</span>
            </div>
          </div>
      </li>`
  );
}

function errorUpload(name) {
  progressArea.innerHTML = "";
  uploadedArea.classList.remove("onprogress");
  uploadedArea.insertAdjacentHTML(
    "afterbegin",
    `<li class="row">
          <div class="content upload">
            <div class="detalhesUpload">
            <img class="iconeErroChat" src="/Resources/Assets/Imagens/IconeFileError.png">
              <span class="name">${name} • Error</span>
            </div>
          </div>
        <i class='bx bx-error-circle' style='color:#db3535'  ></i>
      </li>`
  );
}

//Função responsável por limpar o campo de anexo
function clearData() {
  progressArea.innerHTML = "";
  uploadedArea.innerHTML = "";
  iconInputFile?.removeAttribute("hidden");
}

//Função responsável por verificar se existe arquivo de upload
function hasUpload() {
  const file = document.getElementById("image_input");
  const fileName = file.value;

  if (!fileName) {
    status.innerHTML = `<div>
                            <img src="" alt="Ícone de atenção">
                            <div>É obrigatório fazer o upload da capa do livro!</div>
                          </div>`;
    return false;
  }
}
