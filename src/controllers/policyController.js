import express from "express";

export const policy = (req, res) => {
  return res.render("policy/policy", {
    contents: `제1조 (목적) \n
  본 약관(이하 "약관")은 유언을쓰다(이하 '웹사이트')와 회원에 관한 제반사항을 규정함을 목적으로 합니다. \n
  \n\n제2조 (약관의 효력 등) \n
  1. 약관은 공시하고 상대방이 동의함으로써 효력을 발생합니다. 본 약관의 공시는 웹사이트 홈페이지에 게시하는 방법으로 합니다. \n
  2. 웹사이트는 약관의 규제에 관한 법률 등 관련법을 위배하지 않는 범위내에서 약관을 개정할 수 있습니다. \n
  3. 웹사이트가 약관을 개정할 경우에는 시행일 및 개정사유를 명시하여 웹사이트 홈페이지에 시행일 7일전까지 공지합니다. \n
  4. 제3항의 방법으로 변경 고지된 약관은 기존의 회원에게도 유효하게 적용됩니다. \n
  \n\n제3조 (약관의 해석 및 관할법원) \n
  1. 약관에 정하지 아니한 사항과 이 약관의 해석에 관하여는 관계법령 및 상관례에 따릅니다. \n
  2. 회원과 웹사이트 사이에 분쟁이 발생할 경우에 관할 법원은 서울중앙지방법원으로 합니다. \n
  \n\n제4조 (용어의 정의)'회원'은 웹사이트에 개인정보를 제공하여 회원등록을 한 자로서, 웹사이트가 제공하는 서비스를 계속적으로 이용할 수 있는자를 말합니다.\n
  \n\n제5조 (회원 가입 및 자격)\n
  1. 웹사이트가 정한 양식에 따라 회원정보를 기입한 후 회원가입을 신청함으로써 회원으로 등록됩니다.\n
  2. 다음 각 호에 해당하는 경우에 웹사이트는 회원 가입을 인정하지 않거나 회원 자격을 박탈할 수 있습니다.\n
  ◦ 다른 사람의 명의를 사용하여 가입 신청한 경우\n
  ◦ 신청 시 필수 작성 사항을 허위로 기재한 경우\n
  ◦ 관계법령의 위반을 목적으로 신청하거나 그러한 행위를 하는 경우\n
  ◦ 사회의 안녕질서 또는 미풍양속을 저해할 목적으로 신청하거나 그러한 행위를 하는 경우\n
  ◦ 다른 사람의 웹사이트의 이용을 방해하거나 그 정보를 도용하는 등 전자거래질서를 위협하는 경우\n
  3. 웹사이트가 회원 자격을 박탈하는 경우에는 회원등록을 말소합니다. 이 경우 회원에게 사전 통지하여 소명할 기회를 부여합니다.\n
  \n\n제6조 (개인정보의 취득 및 이용)\n
  1. 웹사이트는 개인정보 보호정책을 제정하여 시행하고, 개인 정보의 취득과 이용, 보호 등에 관한 법률을 준수합니다. 개인정보보호정책은 홈페이지 하단에 상시적으로 게시합니다.\n
  2. 웹사이트는 고객이 제공하는 개인정보를 본 서비스 이외의 목적을 위하여 사용할 수 없습니다.\n
  3. 웹사이트는 고객이 제공한 개인정보를 고객의 사전 동의 없이 제 3자에게 제공할 수 없습니다. 단, 다음 각 호에 해당하는 경우에는 예외로 합니다.\n
  ◦ 도메인이름 검색서비스를 제공하는 경우\n
  ◦ 전기통신기본법 등 관계법령에 의하여 국가기관의 요청에 의한 경우\n
  ◦ 범죄에 대한 수사상의 목적이 있거나 정보통신윤리위원회의 요청이 있는 경우\n
  ◦ 업무상 연락을 위하여 회원의 정보(성명, 주소, 전화번호)를 사용하는 경우\n
  ◦ 은행업무상 관련사항에 한하여 일부 정보를 공유하는 경우\n
  ◦ 통계작성, 홍보자료, 학술연구 또는 시장조사를 위하여 필요한 경우로서 특정 고객임을 식별할 수 없는 형태로 제공되는 경우\n
  \n\n제7조 (회원 탈퇴)\n
  1. 회원은 웹사이트에 언제든지 탈퇴를 요청할 수 있으며 웹사이트는 즉시 회원탈퇴를 처리합니다.\n
  2. 회원이 웹사이트에서 이용중인 서비스의 만기일이 지나지 않은 경우 웹사이트는 탈퇴를 처리하지 않습니다.\n
  \n\n제8조 (회원에 대한 통지)\n
  1. 웹사이트가 회원에 대한 통지를 하는 경우, 회원이 웹사이트에 제출한 전자우편 주소로 할 수 있습니다.\n
  2. 웹사이트는 불특정다수 회원에 대한 통지의 경우 1주일 이상 웹사이트 게시판에 게시함으로서 개별 통지에 갈음할 수 있습니다. \n
  제9조 (웹사이트의 의무)\n
  1. 웹사이트는 본 약관이 정하는 바에 따라 지속적이고 안정적인 서비스를 제공하는데 최선을 다합니다.\n
  2. 웹사이트는 항상 등록자의 정보를 포함한 개인신상정보에 대하여 관리적, 기술적 안전조치를 강구하여 정보보안에 최선을 다합니다.\n
  3. 웹사이트는 공정하고 건전한 운영을 통하여 전자상거래 질서유지에 최선을 다하고 지속적인 연구개발을 통하여 양질의 서비스를 제공함으로써 고객만족을 극대화하여 인터넷 사업 발전에 기여합니다.\n
  4. 웹사이트는 고객으로부터 제기되는 불편사항 및 문제에 대해 정당하다고 판단될 경우 우선적으로 그 문제를 즉시 처리합니다. 단, 신속한 처리가 곤란할 경우, 고객에게 그 사유와 처리일정을 즉시 통보합니다.\n
  5. 웹사이트는 소비자 보호단체 및 공공기관의 소비자 보호업무의 추진에 필요한 자료 등의 요구에 적극 협력합니다.\n
  \n\n제10조 (계약의 해지 및 이용제한)\n
  1. 회원이 서비스 이용계약을 해지하고자 하는 경우에는 본인이 서비스 또는 전자우편을 통하여 회원탈퇴신청을 하여야 하며 회원의 탈퇴신청에 대해 회사는 빠른 시간 내로 탈퇴처리를 할 의무가 있습니다.\n
  2. 회원이 사망한 때는 회원자격을 상실합니다. \n
  3. 회사는 회원이 제14조 회원의 의무에 위배되는 행위를 한 경우 사전통지 없이 서비스 이용계약을 해지하거나 회원자격을 적절한 방법으로 제한 및 정지할 수 있습니다. \n
  \n\n제11조 (회원의 의무) \n
  1. 회원은 관계법령, 이 약관의 규정, 이용안내 및 주의사항 등 회사가 통지하는 사항을 준수하여야 하며, 기타 회사의 업무에 방해되는 행위를 하여서는 아니 됩니다. \n
  2. 회원은 회사의 사전승낙 없이는 서비스를 이용하여 영업활동을 할 수 없으며, 그 영업활동의 결과와 회원이 약관에 위반한 영업활동을 하여 발생한 결과에 대하여 회사는 책임을 지지 않습니다. 회원은 이와 같은 영업활동으로 회사가 손해를 입은 경우 회원은 회사에 대하여 손해배상의무를 집니다. \n
  3. 회원은 서비스를 이용하여 얻은 정보를 회사의 사전 승낙 없이 복사, 복제, 변경, 번역, 출판, 방송, 기타의 방법으로 사용하거나 이를 타인에게 제공할 수 없습니다. \n
  4. 회원은 이용신청서의 기재내용 중 변경된 내용이 있는 경우 서비스를 통하여 그 내용을 회사에 통지하여야 합니다. \n
  5. 회원은 서비스 이용과 관련하여 다음 각 호의 행위를 하여서는 아니 됩니다. \n
  ◦ 다른 회원의 아이디(ID)를 부정사용하는 행위\n
  ◦ 범죄행위를 목적으로 하거나 기타 범죄행위와 관련된 행위 \n
  ◦ 선량한 풍속, 기타 사회질서를 해하는 행위\n
  ◦ 타인의 명예를 훼손하거나 모욕하는 행위\n
  ◦ 타인의 지적재산권 등의 권리를 침해하는 행위\n 
  ◦ 타인에 대한 개인정보를 수집 또는 저장하는 행위\n 
  ◦ 스토킹(stalking) 등 타인을 괴롭히는 행위 \n
  ◦ 해킹행위 또는 컴퓨터바이러스의 유포행위\n
  ◦ 타인의 의사에 반하여 광고성 정보 등 일정한 내용을 지속적으로 전송하는 행위\n
  ◦ 불특정 다수를 대상으로 하여 광고, 선전의 게시 등 영리를 목적으로 하는 행위 \n
  ◦ 서비스의 안정적인 운영에 지장을 주거나 줄 우려가 있는 일체의 행위\n
  ◦ 관계법령에 위배되는 행위\n
  ◦ 기타 회사가 서비스 운영상 부적절하다고 판단하는 행위\n
  6. 회사가 관계법령 및 "개인정보보호정책"에 의하여 그 책임을 지는 경우를 제외하고, 회원에게 부여된 ID의 비밀번호의 관리 소홀, 부정 사용에 의하여 발생하는 모든 결과에 대한 책임은 회원에게 있습니다. \n
  7. 회원은 자신의 ID나 비밀번호가 부정하게 사용되었다는 사실을 발견한 경우에는 즉시 회사에 신고하여야 하며, 회사의 안내가 있는 경우에는 그에 따라야 합니다. 이를 따르지 않는 경우 이에 따른 모든 결과의 책임은 회원에게 있습니다. \n
  \n\n제12조 (게시물 또는 내용물의 삭제) 웹사이트은 회원이 게시하거나 등록하는 서비스 내의 내용물, 채팅방 개설 등이 제14조의 규정에 위반되거나 회사 소정의 게시기간을 초과하는 경우 사전 통지나 동의 없이 이를 삭제할 수 있습니다. \n
  \n\n제13조 (회원의 아이디(ID) 및 비밀번호에 대한 의무) \n
  1. 회원은 서비스를 이용하는 경우 아이디(ID) 및 비밀번호를 사용해야 합니다. \n
  2. 아이디(ID) 및 비밀번호에 대한 모든 관리의 책임은 회원에게 있습니다. \n
  3. 회원은 아이디(ID) 및 비밀번호를 제3자에게 이용하게 해서는 안됩니다. \n
  4. 아이디(ID) 및 비밀번호의 관리상 불충분, 사용상의 과실, 제3자의 사용 등에 의한 손해의 책임은 회원이 집니다. \n
  5. 회원은 아이디(ID) 및 비밀번호를 도난당하거나 제3자에게 사용되고 있음을 인지한 경우에는 바로 회사에 통보하고 회사의 지시가 있는 경우에는 그에 따라야 합니다.\n
  \n\n부 칙\n
  본 약관은 2022-10-25부터 시행합니다.`,
  });
};