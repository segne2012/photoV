import fs from 'fs';
import url from "url";


const basePath = "/src/components/";
const compPath = url.fileURLToPath(url.resolve(import.meta.url, "../src/components"));

const confTemp = `interface CompConfig { [key:string]: ConfItem}
interface ConfItem {path: string; name: string}

// conf-start
const conf:CompConfig = {conf}
// conf-end

export default conf`

const readConf = () => {
    let conf = {}
    if(fs.existsSync(compPath + "/conf.ts")) {
        let confData = fs.readFileSync(compPath + "/conf.ts", 'utf8');
        if(confData) {
            confData = confData.replace(/\r\n/g, "");
            fs.writeFileSync(compPath + "/conf.ts", '');
            let mapJsonString = confData.match(/conf:CompConfig = (.*)\/\/ conf-end/)
            conf = JSON.parse(mapJsonString[1]);
        }
    }
    writeConf(conf);
}

const writeConf = (conf) => {
    fs.readdir(compPath, (err, files) => {
        if(err) throw err;
        files.map(item => {
            if(item.endsWith("Comp.vue")) {
                let key = item.replace("Comp.vue", '');
                if(!conf[key]) {
                    conf[key] = {
                        name: key,
                        path: basePath + item
                    }
                }
            }
        })
        const confStr = jsonFormat(JSON.stringify(conf));
        
        fs.appendFile(compPath + "/conf.ts", confTemp.replace('{conf}', confStr), err => {
            if(err) throw err;
            console.log("写文件成功！")
        });
    })
    
}

const jsonFormat = (jsonStr) => {
    let str = "";
    let length = jsonStr.length;
    let indent = ""
    for(let i = 0; i < length; i++) {
        switch (jsonStr.at(i)) {
            case '{':
                indent += "  ";
                str += `{\r${indent}`;
                break;
            case '}':
                indent = indent.slice(0, -2);
                str += `\r${indent}}`;
                break;
            case ',':
                str += `,\r${indent}`;
                break;
            default:
                str += jsonStr.at(i);
                break;
        }
    }

    return str;
}

readConf();