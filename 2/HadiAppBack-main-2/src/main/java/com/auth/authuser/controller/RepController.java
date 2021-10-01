package com.auth.authuser.controller;

import com.auth.authuser.model.Repo;
import com.auth.authuser.service.HistoryService;
import com.auth.authuser.service.RepService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Date;
import java.util.List;

@RestController
@RequestMapping("/folders")
public class RepController {

    @Autowired
    RepService repService;
    @Autowired
    HistoryService historyService;

    @GetMapping("/")
    public ResponseEntity<List<Repo>> getAll(){
        List<Repo> repos = repService.getAll();
        return new ResponseEntity(repos,HttpStatus.OK);
    }
    @GetMapping("/{idUser}")
    public List<Repo> getFolder(@PathVariable Long idUser){
        List<Repo> repo = repService.getRepos(idUser);
        
        return repo;
    }
    
    @GetMapping("/parent/{idUser}")
    public List<Repo> getParentFolder(@PathVariable Long idUser){
        List<Repo> repo = repService.getRepos(idUser);
        repo.removeIf(r->r.getParents()!=null);
        
        return repo;
    }
    
    

   @PostMapping(value="/creeRepo", consumes={"application/json"})
    public ResponseEntity<Repo> addFolder(@RequestBody Repo repo) throws Exception {
        Repo repTemp = repService.addRepo(repo);
        historyService.addFolderElementHistory(null, repTemp, repTemp.getUser(), repTemp.getSizeRepo(), new Date(), "created",repTemp.getName());

       return new ResponseEntity<>(repTemp, HttpStatus.CREATED);
    }

    @DeleteMapping("/deleteRepo/{id}")
    public String deleteFolder(@PathVariable String id){
        Long repId = Long.valueOf(id);
       repService.deleteRep(repId);
       return "doc";
    }

   /* @GetMapping("/downloadFile/{userId}/{fileId}")
    public ResponseEntity<ByteArrayResource> downloadFile(@PathVariable Long userId,@PathVariable Long fileId){
        Repo repo =  repService.getRepos(userId,fileId).get(0);
        return ResponseEntity.ok()
                .contentType(MediaType.parseMediaType(FOL))
                .header(HttpHeaders.CONTENT_DISPOSITION,"attachment:filename=\""+doc.getDocName()+"\"")
                .body(new ByteArrayResource(doc.getData()));
    }
    */

    @PutMapping("/updateName/{repoId}")
    public ResponseEntity<Repo> updateFolderName(@PathVariable("repoId") Long repoId,@RequestBody Repo repo){
    
       Repo repTemp = repService.updateNameFolder(repo,repoId);
       return new ResponseEntity<>(repTemp,HttpStatus.OK);
    }

    @PutMapping("/moveFolder/{folderId}/{newParentId}")
    public ResponseEntity<Boolean> moveFolder(@PathVariable String folderId, @PathVariable String newParentId){
        Boolean moveState = repService.moveFolder(folderId, newParentId);
        return new ResponseEntity<>(moveState, HttpStatus.OK);
    }
}
