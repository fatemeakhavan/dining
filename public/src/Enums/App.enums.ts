export enum ERequest {
  POST = 'POST',
  GET = 'GET',
  PUT = 'PUT',
  PATCH = 'PATCH',
  DELETE = 'DELETE',
  HEAD = 'HEAD',
}

export enum ERoles {
  admin = 'ADMIN_ROLE',
  user = 'USER_ROLE',
}

export enum EDraftStatus {
  editing = 'editing',
  pending = 'pending',
  rejected = 'rejected',
  accepted = 'accepted',
}

export enum EVersionStatus {
  public = 'public',
  private = 'private',
  pending = 'pending',
  rejected = 'rejected',
}

export enum ELanguage {
  APACHE = 'Apache',
  BASH = 'Bash',
  COFEESCRIPT = 'CoffeeScript',
  CPP = 'C++',
  CS = 'C#',
  CSS = 'CSS',
  DIFF = 'Diff',
  HTML = 'HTML',
  HTTP = 'HTTP',
  INI = 'INI',
  JAVA = 'Java',
  JAVASCRIPT = 'JavaScript',
  JSON = 'JSON',
  MAKEFILE = 'Makefile',
  MARKDOWN = 'Markdown',
  NGINX = 'Nginx',
  OBJECTIVEC = 'Objective-C',
  PERL = 'Perl',
  PHP = 'PHP',
  PYTHON = 'Python',
  RUBY = 'Ruby',
  SQL = 'SQL',
  VBSCRIPT = 'VBScript',
  XHTML = 'XHTML',
  XML = 'XML',
}

export enum ECrumb {
  CATEGORY = 'CATEGORY',
  COURSE = 'COURSE',
  SYLLABUS = 'SYLLABUS',
  CONTENT = 'CONTENT',
  LEAGUE = 'LEAGUE',
  QUESTIONS = 'QUESTIONS',
}
