Use the git branch command to create a new branch, and git checkout to switch to it. Alternatively, you can use git checkout -b branch_name to create and switch to a new branch in one step.

Each team member should work on their specific branch, making changes to the code as needed. Regularly commit your changes using git commit to save your progress.

When you're ready to share your work with the team, push your branch to the central repository using git push origin branch_name.

On platforms like GitHub or GitLab, you can initiate a Pull Request (PR) or Merge Request (MR) to propose your changes for integration into the main branch.

Merge Your Branch:

Once the code has been reviewed and any conflicts are resolved, the branch can be merged into the main branch. You can do this using the platform's merge button or by using Git commands (git merge).

After merging, it's a good practice to delete the branch both locally and remotely (using git branch -d branch_name locally and git push origin --delete branch_name remotely).

BRANCH & MERGE

Isolating work in branches, changing context, and integrating changes
git branch
list your branches. a * will appear next to the currently active branch
git branch [branch-name]
create a new branch at the current commit
git checkout
switch to another branch and check it out into your working directory
git merge [branch]
merge the specified branch’s history into the current one
git log
show all commits in the current branch’s history

# Throughout document the process for the final presentation 
# Challenges we faced 
# Instruction on branching 


# In the repository you can see with the main tab what you are working on which branch and if a new branch has been created ~ main and master branch are the same 

doing commman git branch will tell you want branch you are working on everyone default is the main branch 
To make a file inside a branch you can do touch branchname

Step 1: git checkout -b [branch name]
This creats a new branch 

git status 
# basic infomative command that will tell you if you made changes that are not staged

step 2: changes were made
# After changes you will use the git add [filename] this tells git to start tracking staging in a distinct file
# then git commit -m " [write a message]"  this is to describe a message about changes 
# git push sends a snapshot to the repository 
# side note you can go to git hub repository go to code and it should give you more or less a timeline 

step 3: Are you switching between branches 
# if yes you can use the git checkout branch name to switch between branches 
# A short cut if you want to create a new branch and switch to it is git checkout -b new_branch_name

# Checking Out Files: You can use git checkout to discard changes in your working directory and restore a specific file to its state in the last committed version.
# git checkout file_name



You want to update with changes from remote repository into local branches 
# git pull origin master 
For example, if you want to update the 'main' branch with changes from 'origin/master':
git checkout main
# Then, run the pull command to fetch and merge changes from 'origin/master':
git pull origin master

# One way to check if no conflicts have occured after using git pull origin master is to go to the repository on github go to branch and go to create new pull request 
# A good way to also have peer review is in the pull request you can ask teammates for approval and or comments about changes being made and git will but that in the 
# history