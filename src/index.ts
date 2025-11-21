import http from 'node:http';
import fs from 'node:fs';
import url from 'node:url';
import path from 'node:path';

(await import('dotenv')).config({path:path.resolve(import.meta.dirname, '..', '.env')});

const PORT = process.env.SERVER_PORT || 8090;

const server = http.createServer(async (req, res)=>{
    try {
        const reqUrl = url.parse(req.url?.toString() as string, true);
        
        res.setHeader('Content-Type', 'text/html');

        if (req.method === 'GET') {
            console.log(reqUrl);
            
            if(reqUrl.pathname === '/'){
                const file = await fs.promises.readFile(path.resolve(import.meta.dirname, 'pages', 'index.html'), { encoding: 'utf8' });
                
                res.writeHead(200);
                res.write(file);
            }
            else if(reqUrl.pathname === '/about' || reqUrl.pathname === '/about/'){
                const file = await fs.promises.readFile(path.resolve(import.meta.dirname, 'pages', 'about.html'), { encoding: 'utf8' });
                
                res.writeHead(200);
                res.write(file);
            }
            else if(reqUrl.pathname === '/contact-me' || reqUrl.pathname === '/contact-me/'){
                const file = await fs.promises.readFile(path.resolve(import.meta.dirname, 'pages', 'contact-me.html'), { encoding: 'utf8' });
                
                res.writeHead(200);
                res.write(file);
            }
            else{
                const file = await fs.promises.readFile(path.resolve(import.meta.dirname, 'pages', '404.html'), { encoding: 'utf8' });
                
                res.writeHead(404);
                res.write(file);
            }
        }
    
        res.end();
    } catch (error) {
        res.statusCode = 404;
        console.log(error);
        res.end(error);
    }
}); 

server.listen(PORT, ()=>{
    console.log('Servidor rodando na porta ', PORT);
})