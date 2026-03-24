package kr.co.iei.subject.model.vo;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@NoArgsConstructor
@AllArgsConstructor
@Data
public class Subject {
	private Integer subjectNo;			//과목 관리 번호
	private String subjectTitle;		//과목 이름
	private String subjectInstructor;	//담당 강사
	private Integer subjectCategory;		//과목 분류 (1: 백앤드, 2: 프론트앤드, 3: DB)
	private Integer subjectLevel;		//과목 난이도(1: 초급, 2: 중급, 3: 고급)
	private Integer subjectCount;		//수강정원
}
