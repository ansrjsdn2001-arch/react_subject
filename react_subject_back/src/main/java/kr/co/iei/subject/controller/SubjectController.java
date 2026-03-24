package kr.co.iei.subject.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import kr.co.iei.subject.model.service.SubjectService;
import kr.co.iei.subject.model.vo.ListItem;
import kr.co.iei.subject.model.vo.Subject;

@CrossOrigin
@RestController
@RequestMapping(value="/search")
public class SubjectController {
	@Autowired
	private SubjectService subjectService;

	@GetMapping
	public ResponseEntity<?> searchSubjectList(@ModelAttribute ListItem items){
		List<Subject> list = subjectService.searchSubjectList(items);
		return ResponseEntity.ok(list);
	}
	
}
