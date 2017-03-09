# Importing python modules
import json
import requests
import sys


class Tasks:
    def __init__(self, username, password, request):
        self.tasks = self.getTasks()
        # Authentication for user filing issue (must have read/write access to
        # repository to add issue to)
        self.USERNAME = username
        self.PASSWORD = password

        # The repository to add this issue to
        self.REPO_OWNER = 'renatobenks'
        self.REPO_NAME = 'ToDoListSoftExpert'

        # For make a request on GitHub issues
        self.request = request

        # Transform tasks on issues
        self.createTasks()

    @staticmethod
    def getContentTasks(content):
        title = str()
        body = str()
        for i, line in enumerate(content):
            if line:
                subtitle = str()
                if 'WEB' in line:
                    title = line
                if '- [ ]' in line:
                    subtitle = line.split('- [ ]')[1]
                    title = title + ' - ' + subtitle
                if i is not 0:
                    if not subtitle:
                        body += line + '\n'
                    else:
                        body += '##' + subtitle + '\n\n'
        title = ' '.join(title.split())
        return {
            'title': title,
            'body': body
        }

    @staticmethod
    def getTasksTextFromMarkdown():
        file = open('task_by_task.md', 'r', encoding='utf-8')
        tasks = file.read()
        file.close()
        return tasks

    def getTasks(self):
        tasks = []
        for task in self.getTasksTextFromMarkdown().split('###'):
            if '#' not in task:
                tasks.append(self.getContentTasks(task.split('\n')))
        return tasks

    def makeGitHubIssue(self, task, milestone=None):
        """Create an issue on github.com using the given parameters."""
        # Our url to create issues via POST
        url = 'https://api.github.com/repos/%s/%s/issues' % (self.REPO_OWNER, self.REPO_NAME)
        # Create an authenticated session to create the issue
        session = requests.Session()
        session.auth = (self.USERNAME, self.PASSWORD)
        # Create issue
        issue = {
            'title': task['title'],
            'body': task['body'],
            'assignee': None,
            'milestone': milestone,
            'labels': []
        }
        # Add the issue to our repository
        if self.request is True:
            response = session.post(url, json.dumps(issue))
            if response.status_code == 201:
                return 'Successfully created Issue "%s"' % task['title']
            else:
                return 'Could not create Issue "%s"' % task['title'], '\n', 'Response:', response.content
        else:
            return issue

    def createTasks(self):
        for task in self.tasks:
            print(self.makeGitHubIssue(task, 1))


if __name__ == '__main__':
    try:
        isValid = True
        for argument in sys.argv:
            if not argument:
                isValid = False
        if len(sys.argv) == 4 and isValid:
            Tasks(sys.argv[1], sys.argv[2], sys.argv[3])
        else:
            raise ('Is missing some param that is necessary')
    except Exception as e:
        raise e
