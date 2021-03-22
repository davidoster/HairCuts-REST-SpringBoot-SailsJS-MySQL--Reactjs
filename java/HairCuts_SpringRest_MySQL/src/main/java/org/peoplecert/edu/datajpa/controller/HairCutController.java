package org.peoplecert.edu.datajpa.controller;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;
import org.peoplecert.edu.datajpa.model.HairCut;
import org.peoplecert.edu.datajpa.repository.HairCutRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

@CrossOrigin //(origins = "http://localhost:8081")
@RestController
@RequestMapping("/api")
public class HairCutController {

    @Autowired
    HairCutRepository HairCutRepository;

    @GetMapping("/haircuts")
    public ResponseEntity<List<HairCut>> getAllHairCuts(@RequestParam(required = false) String title) {
        try {
            List<HairCut> HairCuts = new ArrayList<HairCut>();

            if (title == null) {
                HairCutRepository.findAll().forEach(HairCuts::add);
            } else {
                HairCutRepository.findByTitleContaining(title).forEach(HairCuts::add);
            }

            if (HairCuts.isEmpty()) {
                return new ResponseEntity<>(HttpStatus.NO_CONTENT);
            }

            return new ResponseEntity<>(HairCuts, HttpStatus.OK);
        } catch (Exception e) {
            return new ResponseEntity<>(null, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @GetMapping("/haircuts/{id}")
    public ResponseEntity<HairCut> getHairCutById(@PathVariable("id") long id) {
        Optional<HairCut> HairCutData = HairCutRepository.findById(id);

        if (HairCutData.isPresent()) {
            return new ResponseEntity<>(HairCutData.get(), HttpStatus.OK);
        } else {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }

    @PostMapping("/haircuts")
    public ResponseEntity<HairCut> createHairCut(@RequestBody HairCut HairCut) {
        try {
            HairCut _HairCut = HairCutRepository
                    .save(new HairCut(HairCut.getTitle(), HairCut.getDescription(), false));
            return new ResponseEntity<>(_HairCut, HttpStatus.CREATED);
        } catch (Exception e) {
            return new ResponseEntity<>(null, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @PutMapping("/haircuts/{id}")
    public ResponseEntity<HairCut> updateHairCut(@PathVariable("id") long id, @RequestBody HairCut HairCut) {
        Optional<HairCut> HairCutData = HairCutRepository.findById(id);

        if (HairCutData.isPresent()) {
            HairCut _HairCut = HairCutData.get();
            _HairCut.setTitle(HairCut.getTitle());
            _HairCut.setDescription(HairCut.getDescription());
            _HairCut.setPublished(HairCut.isPublished());
            return new ResponseEntity<>(HairCutRepository.save(_HairCut), HttpStatus.OK);
        } else {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }

    @DeleteMapping("/haircuts/{id}")
    public ResponseEntity<HttpStatus> deleteHairCut(@PathVariable("id") long id) {
        try {
            HairCutRepository.deleteById(id);
            return new ResponseEntity<>(HttpStatus.NO_CONTENT);
        } catch (Exception e) {
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @DeleteMapping("/haircuts")
    public ResponseEntity<HttpStatus> deleteAllHairCuts() {
        try {
            HairCutRepository.deleteAll();
            return new ResponseEntity<>(HttpStatus.NO_CONTENT);
        } catch (Exception e) {
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }

    }

    @GetMapping("/haircuts/published")
    public ResponseEntity<List<HairCut>> findByPublished() {
        try {
            List<HairCut> HairCuts = HairCutRepository.findByPublished(true);

            if (HairCuts.isEmpty()) {
                return new ResponseEntity<>(HttpStatus.NO_CONTENT);
            }
            return new ResponseEntity<>(HairCuts, HttpStatus.OK);
        } catch (Exception e) {
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

}
