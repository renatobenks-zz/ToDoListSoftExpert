# Importing python modules
import json
import requests
import sys


class Tasks:
    def __init__(self, owner_repository, repository):
        self.tasks = self.getTasks()
        # Authentication for user filing issue (must have read/write access to
        # repository to add issue to)
        try:
            self.USERNAME = sys.argv[1]
            self.PASSWORD = sys.argv[2]
        except Exception as e:
            raise e

        # The repository to add this issue to
        self.REPO_OWNER = owner_repository
        self.REPO_NAME = repository

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
        file = open('../../.docs/tasks.md', 'r', encoding='utf-8')
        tasks = file.read()
        file.close()
        return tasks

    def getTasks(self):
        tasks = []
        for task in self.getTasksTextFromMarkdown().split('###'):
            if '#' not in task:
                tasks.append(self.getContentTasks(task.split('\n')))
        return tasks

    def makeGitHubIssue(self, task, milestone=None, request=False):
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
        if request:
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
    Tasks('renatobenks', 'ToDoListSoftExpert')
