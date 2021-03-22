package org.peoplecert.edu.datajpa.repository;

import java.util.List;
import org.peoplecert.edu.datajpa.model.HairCut;
import org.springframework.data.jpa.repository.JpaRepository;

public interface HairCutRepository extends JpaRepository<HairCut, Long> {

    List<HairCut> findByPublished(boolean published);

    List<HairCut> findByTitleContaining(String title);
}
