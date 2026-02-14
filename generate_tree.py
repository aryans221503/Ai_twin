import os

def print_tree(startpath):
    exclude = {'.git', '__pycache__', 'venv', 'node_modules', '.idea', '.vscode', 'dist', 'build', 'site-packages', 'generate_tree.py'}
    for root, dirs, files in os.walk(startpath):
        dirs[:] = [d for d in dirs if d not in exclude]
        level = root.replace(startpath, '').count(os.sep)
        if level == 0:
            print(os.path.basename(os.path.abspath(root)) + "/")
        else:
            path_parts = root.replace(startpath, '').split(os.sep)
            # Filter empty strings caused by leading/trailing separators
            path_parts = [p for p in path_parts if p]
            indent = '    ' * (len(path_parts) - 1)
            print(indent + '|-- ' + os.path.basename(root) + "/")
            
        subindent = '    ' * level + '    '
        for f in files:
            if f == 'generate_tree.py': continue
            print(subindent + '|-- ' + f)

if __name__ == '__main__':
    print_tree('.')
