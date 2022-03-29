// **************************** DOM ****************************

const task = document.querySelector('#task');
const add = document.querySelector('#add');
const list = document.querySelector('#list');
const success = document.querySelector('#toast');
const error = document.querySelector('#err');

list.addEventListener('click', rmElm);
list.addEventListener('click', completed);

function crtElm () {

    const li = document.createElement('li');
    const span = document.createElement('span');

    span.classList.add('close');
    span.innerHTML = 'X';
    li.innerHTML = ` <span> ${task.value} </span> `;

    li.appendChild (span);
    list.appendChild (li)

};

// *************************************************************

function completed (e) {
    e.target.parentElement.classList.toggle('checked'); // toogle varsa sil, yoksa ekle (listedeki tamamlanan işlerin işaretlenmesi için)
};

function newElm () {

    if (task.value != '' && task.value != ' ') { // Eklenmek istenen element boş değilse
        
        crtElm();                                //yeni element oluştur
        // STORAGE :
        locStorage(task.value);                  // oluşturulan yeni elementi localStorage'a at
        show(true);                              // yeni element oluşturulduğunu bildiren toast'un görünmesini sağlayan fonksiyonu çalıştır
        task.value = "";                         // element eklendikten sonra input kutusunu temizle

    } else {

        show(false);                             // Eklenmek istenen element boş ise uyarı toast'unun görünmesini sağlayan fonksiyonu çalıştır
    }                                            // (Toast bildirimlerinin görünmesini sağlayan fonksiyon aşağıda...)
};

function show (e) {                             // yukarıdaki newElm fonksiyonunda show'un parametresi true olursa if, false olursa else bloğu çalışır

    if (e) {
 
     success.classList.replace('hide', 'show'); //toast class'ı hide'dan show'a döner
     setTimeout ( () => {                       // burada belirtilen süre bitince show'dan hide'a döner. Yani bildirim toast'u 2 saniyeliğine görünüp kaybolur.
         success.classList.replace('show', 'hide');
     }, 2000 );
 
    } else {
 
     error.classList.replace('hide', 'show'); // if bloğundakinin aynısı olur ama burada uyarı toast'u görünür
        setTimeout ( () => {
            error.classList.replace('show', 'hide');
        }, 2000 );
 
    }
 
 };

function rmElm (e) {

    if (e.target.className === 'close') {                   // tıklanan hedefin class'ı close ise
        if (confirm ('Silmek istediğine emin misin?')) {    // kullanıcıya uyarı ver, onayını iste
            e.target.parentElement.remove();                // kullanıcı onaylarsa hedefin parent'ını sil (parent burada listeye eklenmiş bir eleman oluyor)
            // STORAGE :
            let prm = e.target.parentElement.firstChild.nextElementSibling.textContent.trim() // o elemanı localStorage'dan da sil :
            // tıklanan hedefin parent'ına gidip, ilk child'ının içindeki text'in sağ ve sol boşlklarını silip, girilen veriye ulaşıp, aşağıdaki fonksiyonu uygula
            dltStorage(prm);
        }
    }

};

// ************************** STORAGE İŞLEMLERİ : **************************

// İşlemlerde SIK KULLANILACAK FONKSİYONLAR ı tanımlarız
// getStorage() -> localStorage'dan parse ederek value'yu çeken fonksiyon :
function getStorage () {

    let toDo = JSON.parse(localStorage.getItem('todo'));
    return toDo;

};
// dltStorage() -> getStorage ile value array'ini çekip, elementleri idleriyle beraber sıralayıp, array'den istenilen elemanın idsinden başlayıp bir eleman alacak şekilde splice ile ayırıp(silip), arrayin kalanını stringfy ile 'todo' keyine atayan fonksiyon (yukarıda da kullandık) :
function dltStorage (prm) {

    let toDo = getStorage();

    toDo.forEach((element, id) => { // elementlerin her birini idleri ile sırala

        if (element === prm) { // eleman istenilen parametreye eşit olduğunda,
            toDo.splice(id, 1); // ona ait olan id'den başlayıp 1 eleman alacak şekilde splice et (sadece o elemanı almış olur)
        }

    })
    localStorage.setItem('toDo', JSON.stringify(toDo)); // array'in kalanını tekrar stringe çevirip localStorage'a gönder

}



function locStorage(prm) {
    
    let str = JSON.parse(localStorage.getItem('todo')); // localStorage'da 'todo' key'ine karşılık gelen value'yu parse edip 'str' değişkenine eşitledik
    let toDos;

        if ( str == null ) {
            toDos = []; // Eğer 'str' bir şeye eşit değilse, yani localStorage'da karşılık gelen bir value yoksa boş array oluşturur
        } else {
            toDos = getStorage(); // Aksi takdirde getStorage fonksiyonuna eşitler
        }

    toDos.push(prm); // 'prm' parametresini toDos'a pushlar

    localStorage.setItem('todo', JSON.stringify(toDos)) // 'todo' key'ine oluşturulan toDos arrayini string'e çevirip value olarak atar

};

function LoadedPage () {

    let toDo = getStorage();

    if ( toDo != null ) {

        let html;
        for (let i = 0; i < toDo.length; i++) {

            html = ` <li>
                        <span>
                            ${toDo[i]}
                        </span>
                        <span class="close">
                            X
                        </span>
                    </li> `

            list.innerHTML += html;
        }

    }
};

LoadedPage ();
