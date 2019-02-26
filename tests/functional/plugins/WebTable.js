
let nemo, table

function set(webtable){
	table = webtable
}

async function findRow(params){
    let xpath = `.//tr`
    if(typeof(params) == 'string'){
        xpath += `[./td[contains(.,'${params}')]]`
    }
    else if(Array.isArray(params)){
        params.forEach(item =>{
            xpath += `[./td[contains(.,'${item}')]]`
        })        
    }
    return nemo.view._find(`xpath:${xpath}`,table)
}

async function findRows(params){
    let xpath = `.//tr`
    if(typeof(params) == 'string'){
        xpath += `[./td[contains(.,'${params}')]]`
    }
    else if(Array.isArray(params)){
        params.forEach(item =>{
            xpath += `[./td[contains(.,'${item}')]]`
        })        
    }
    return nemo.view._finds(`xpath:${xpath}`,table)
}

async function head(){
    let xpath = `.//tr[./th]`
    return nemo.view._find(`xpath:${xpath}`,table)
}

async function nextPage(){

}

async function prevPage(){
    
}

async function goToPage(pageNumber){
    
}

async function setPageSize(pageSize){
    
}


export default {
    setup: (nemoInstance, callback) => {
        nemo = nemoInstance
        nemo.table = {
            set,
            findRow,
            findRows,
            head
        }
        callback()
    }
}
