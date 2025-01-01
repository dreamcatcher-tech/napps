**Tom 0:00:00**\
So the process I go through obviously every day, all from Git first, but second
of all before you do a commit, so you've got the list of changes here, I go
through every single file and just skim it using this, so it highlights the
changed bits in the minimap view, in this view on the side, and so I go through
every single file and I skim them.

**Scott 0:00:22**\
this topic is about the usage of github

**Tom 0:00:31**\
well what's changed and and that I will not commit until I've checked every
single file and I didn't actually go through that with you but the difference is
that you're coming in here doing auto-generated text reasoning whereas

**Tom 0:00:54**\
git from like I mean I've been using git for like Christ like 15 years I But
when you use it for code, you like sweat over every line change. And you would
typically have a set of tests that would run. We don't have that, and we may not
have that for a while,

**Tom 0:01:00**\
because you're just working in text. And then when you're in code, you're like
every single change matters, because you might have broken something, or it
takes you a lot of time to get things fixed. So that's why I imagine you don't
do this check.

**Tom 0:01:11**\
But even when I'm doing generated code, like when I was working in the reasoning
repo I will still come in and skim it because when you skim it you just sort of
notice when there's something stupid or something weird and that one gigabyte
file that you had an issue with you would see that because you would click on
this and it would not open because it would take too long and in VS code Would
complain. You can either if it You just go discard changes if you want to roll
it back. Or you can manually go in there on the command line and delete the file
if your editor is not behaving well, because the editor doesn't like big files.
The note on the staging directory,

**Tom 0:01:30**\
You can either if it You just go discard changes if you want to roll it back. Or
you can manually go in there on the command line and delete the file if your
editor is not behaving well, because the editor doesn't like big files. The note
on the staging directory,

**Tom 0:01:50**\
like do you know what the staging area is? It's not really using staging. Fair
enough. It's a bit of a subtle one. So changes is here, but what you can do,
technically what's happening when you go commit,

**Tom 0:02:01**\
it's actually hitting the plus, stage all, and then going commit. Because what
that means is that you can take files that are in the staging area, where
staging is, these files are about to be committed, and if you take them out of
the staging area,

**Tom 0:02:14**\
you can still do a commit, but it will only commit what's in the staging area.
So you use that if you want to, if you're not ready to commit a file, but you've
changed it, you can go through and sort of just pick the files you want to add
to a commit

**Tom 0:02:26**\
and put them in the staging area using the plus down here And using the minus
obviously on commit If you have things changed and you go what plus to add it to
commit or minus to remove it If you have got nothing in the staging it does a
like a shortcut piece of sugar for you Where if you go commit with nothing in
staging it assumes that you mean that everything should be in staging and
everything should be committed

**Tom 0:02:46**\
But if you if you use the plus to add it from changed into staging then when you
do commit it will only add just the it will only add what's in staging right so
if I go in here and I go single file commit see how it only added that one file
from staging but left everything else here I see all right so you go from
changes to staging yeah and then you can click on each file and then yes but if
I don't say everything is it's sort of like shortcut

**Tom 0:03:15**\
stage all. And then when I go commit, it assumes that everything needs to be put
up there.

**Scott 0:03:22**\
Yeah, I'm sorry for another new question.

**Tom 0:03:23**\
Don't worry about it. It's sync changes. And I was asking for a message.

**4 0:03:26**\
And it's like, I don't put a message in that.

**8 0:03:27**\
I don't know if it's a format.

**Tom 0:03:28**\
Sync changes doesn't require a message. Sync changes is only because I've only
committed locally. So I can click this little button here. And I'll get this
like GitGraph view of what's going on right and so here I can see that My commit
shortcut stage all is not it's not synchronized with With the cloud or with the
remote repository because I've only done it locally

**Tom 0:03:48**\
and If it has the word origin slash something it means that that is the room the
remote. So everything that starts with something for slash, so upstream is a
remote, is a remote server, destination or remote repository. Origin, but
because this has got no origin,

**Tom 0:04:11**\
it's like, you know that that's just local. I'll admit that that's not
immediately easy to grasp. There are other ways to see it. This other button,
source control graph, is like a mini, I think this get graph came from an
extension, so that's why you might not have it.

**Tom 0:04:25**\
Sorry?

**Scott 0:04:26**\
I'm not sure.

**Tom 0:04:26**\
But what you definitely will have is this thing, the source control graph,
right? Yeah. And so here, you can see that when it's got cloud, that means that
that's the commit that the cloud knows about. But this commit and this commit,
the cloud stops there. The cloud doesn't know about these things. And so you've
got to tell the cloud about these commits. It assumes that you're messing around
locally by default.

**Tom 0:04:56**\
And so you do your commits and all that. And only when you're ready do you sync
to server, which pushes it up to the cloud.

**6 0:05:02**\
Yeah, yeah.

**Tom 0:05:03**\
And so what's good about that is that I can, before I've pushed it to the cloud,
I can use this tools like commit, undo last commit. And it will pop off the last
thing that I committed, which was all these files, if you recall, and it will
also give me back the commit message so that I can, if I'm like, oh no, wait,
all I wanted was to just take out that one file and then put it back in, right?
So you can sort

**Tom 0:05:25**\
of dance around like that before you do your push. Your push is when you send it
to the cloud. And so I can go commit, undo last commit. But the thing is, I can
do that forever. Now, you'll run into trouble once you get back behind the
commits that have been sent to the cloud. So I won't show you how to do that,
because that's the one way that you could cause me some grief. But here, for
example, because I'm still

**Tom 0:05:46**\
ahead of the cloud icon, I can still go commit, undo last commit. And now I've
undone even that previous one, and now I'm back to being in line with the cloud
one.

**Scott 0:05:56**\
That makes a lot of sense. That makes a lot of sense.

**Tom 0:05:57**\
This is very helpful.

**Scott 0:05:58**\
And thank you for your patience on that.

**Tom 0:06:00**\
No, it's all good. Sorry I didn't actually give you a crash course on Git. I
just didn't think to do it because you kind of have an attitude of She'll be
right and I was like, oh, you know, but actually You didn't and that's fine
because it's gets actually a massive pain. Well, it's a funny kind of
sophisticated it's it's like it's minimal, but the nature of of Hashed base
storage and

**Tom 0:06:20**\
Parallel lines of conflicting independent development. This is as simple as it
gets it's just that's just the nature of concurrency really is what get hits and
so huge I can't do any wrong on this because it's not out and then it's like no
you can

**Tom 0:06:54**\
burn time you can't do damage but you can waste your own time is definitely
something that happened yesterday yeah and then I'm not sure like it's very
helpful but then I'm like if you still don't know fundamentally what's going on
under the hood then you're going to get a problem. Now the reason why I think
it's

**Tom 0:06:59**\
important for you to understand the internals of Git is because this is this it
specifies a very foundational it specifies the nature of blockchains themselves
and that's why you must understand no matter how much effort it takes you need
to understand how Git works and why it is the way it is. And this is why I'm not
too grumpy with yourself for having spent time to actually you know spin
yourself up because yeah I'm a little bit grumpy because you I

**Tom 0:07:24**\
this is so valuable that I could have speed you up like yeah but there's value
in actually going through the docs and actually trying to understand it and so
on. Call out for help man because it's it's a hard hard thing okay now here's a
good site that teaches you, in very nice graphical terms, about how to do Git.
Like, I can click around and do stuff. And then you can do quizzes, where it
will help

**Tom 0:07:53**\
you understand what's happening. So yeah, so the reason why I'm grumpy about it
is because of you, like, I was reading the docs earlier. But listen, after a
decade, a lifetime of using it, I can shortcut your learning process
significantly, tell you what's important, what doesn't matter, and offer you
pointers to say, you know, play around with tools like this if you want a crash
course.

**Scott 0:08:12**\
I'm going to go back and double check what site Tom is talking about there is
called learn-git-branching.js.org I'm going to restart the video. I've rewound
it a bit, so ignore the parts that are repeated.

**Tom 0:09:05**\
nice graphical terms about how to do Git. Like I can click around and do stuff.
And then you can do quizzes, where it will help you understand what's happening.
So the reason why I'm grumpy about it is because if you're like, I was reading
the docs, I was learning it, I'm like,

**Tom 0:09:23**\
yeah, but listen, after a decade, a lifetime of using Git, I can shortcut your
learning process significantly, tell you what's important, what doesn't matter,
and offer you pointers to say, you know, play around with tools like this. If
you want to crash course, this is how you learn it. Because it is a jolly hard
subject, not because of Git, because of the nature of the medium that

**Tom 0:09:48**\
it operates in. yeah, okay, that's a good one. So, where I'm at at the moment
is, as I said earlier, I can't go from Berkey because I didn't trust Cursor.
That's probably not Cursor's problem. You need to regain trust in Cursor because
that's your primary tool. So, you don't want to ever be in odds with So I went
back to command line which is my my comfort zone and everything I was just doing
with this latest commit was through that but I'm barely scratching the surface
of this but I don't think right now what I'm thinking is that all I'm interested
in is how to successfully commit to reasoning and put a decent message up in a
way that doesn't wipe anything that you've done out.

**Tom 0:10:31**\
No, you're good. I think you got that. I think you got caught, a curve ball, by
that large file. Because you weren't going one by one through each file. I know
that's painful, but you should really do that. And I would argue to you that if
you find yourself fatigued at the number of files you're checking, there's
something wrong with your process. Because even if you're doing too much,

**Scott 0:11:32**\
you need too few commits.

**Tom 0:11:33**\
Yeah, right, too few commits, or you're generating too many files, or something
like that. But there's good signal to be learned from the fact that you should
do that. You should do that ritual every time before you commit. You're like,
what am I saying to the world?

**Tom 0:11:47**\
I need to check it line by line, or file by file at least.

**Scott 0:11:47**\
Yeah, no, this is helpful. And yes, you're still going to call out difficulties
if it's 1 AM your time.

**Tom 0:11:57**\
Yeah, but just log the problem, and then I'll catch you up and when I get up or
whatever. But I can't stress how important it is to get the process of using Git
right. It's worth every disruption or delay or whatever, and trust me, it's a
lot faster for us as

**Tom 0:12:11**\
a team if you tell me and I help you than to just try and do it yourself. It's a
dangerous topic. I burned a Saturday. It's not a huge problem.

**Scott 0:12:17**\
Everything's a huge problem.

**Tom 0:12:18**\
Everything's a huge problem, and I'll tell you why. We just gained the
capability to generate code and logic at a rate somewhere between 10 times and
100 times. That means that you burn one Saturday is the same as burning 10. Does
it still feel like a light, easy throwaway time? It's a dangerous time right
now. We just got amplified. We just experienced our first amplification. Each
day is now worth one amplified day, which is significantly more.

**Scott 0:12:39**\
Yeah, so I get that point. And the takeaway is, okay, if I've done that with
heuristic of going through each file,\
I don't notice that there's a 1.1 gig file.

**Tom 0:12:49**\
I'd like to mark a change of topic at this point. The previous topic is not the
same as the next one.

**Tom 0:13:32**\
Is that right? No, I managed this morning. I managed this morning. Let's go with
the plan. So I've got 15 minutes, that's the best place to go. So I need to get
into your branch, so I'll just document all my stuff, because YOLO let\
that part of me as I check to make sure my things aren't broken. That's a really
top tip actually, thank you for that. There's something about taking the time to
take a look at it too, and it makes you think at a higher level, you're like,
this was the change.

**Scott 0:14:00**\
And it was, I stopped it.

**Tom 0:14:07**\
I just, I don't know. I didn't even think about it before, but I'm like, that's
not. And I'm probably not mentioning any of these docs that I went through, and
all one advising me, which was like, I was-

**Tom 0:14:16**\
That's another example, right? Of like, you could have asked O1, until the cows
come home, and yet telling, talking to a human that goes like, I'll go play this
game. It's sort of like, it's not,\
I don't know what the word is for it, but O1's not wrong. It's just that in
matters of taste, like I know you and I know that this aim is good for you.

**Tom 0:14:26**\
It doesn't have this, never takes a step back and saying, hey, how about we try
this out? I don't think it's that. It's almost like it, there is no one answer
for how do I learn Git. It's a contextual thing.

**5 0:14:49**\
I agree.

**Tom 0:14:52**\
So if you go into, uh, Oh, that's a, oh dear. So also another way you can tell
when someone's done something that shits all over the repo is you can, when you
do a pull in the command line, you can see these disks.

**Tom 0:15:04**\
And you can see like number of lines changed in this sort of visual indicator.
And you can be like, well, hmm, you know, these all look like, at a guess, that
even looks like formatting or some rewording or some re-engineering.

**Scott 0:15:15**\
Yeah, that was because in our previous conversation.

**Tom 0:15:16**\
And then you're like, oh, that's a lot of new stuff. So I need to look at that.
StuckStuck got wiped out, I guess, recently, stuckStuck. So that's sort of,
that's, you know, and I'm like, oh, these are new files.

**Tom 0:15:25**\
You know, so I guess what I should be doing for you is telling you what I look
at when I use Git. Because I get a ton of information out of it. And that's why
I'm always trying to drive you to do commits, because I'm like, well, I can skim
this whole thing.

**Tom 0:15:33**\
And I'm like, well, that's what you did in the day.

**6 0:15:34**\
OK, great.

**Tom 0:15:35**\
So command to plan, I can Control-Click that. And I'm like, yep, command to
plan. And then I'm like, I don't really care about all these bits. This looks
important, blah, blah. And then I skim the new ones and I'm like, eh.

**Scott 0:15:45**\
Yeah, so that's a new heuristic, isn't it? So whenever there is a massive change
in structs,

**Tom 0:15:52**\
it's almost always machine generated. You just get a feel for it. Like, it looks
like a lot of text, but you see it a couple of times and then you start to get\
a sense for, oh, that's what that looks like. We don't see you. And you just get
a sense for it. And that's what, yeah. It's on the stocks. We had the
conversation and I said, okay, right.

**Tom 0:16:00**\
Remember the priority, put it into priorities list and generate links to other
stocks. And we'll talk about it later. But that involved rewriting every stock.
So it looks like, you know,

**4 0:16:18**\
a week's worth of work or whatever.

**Tom 0:16:19**\
Just being done, but it's not. All right, so what am I looking at here? If you
go into, oh, where is it?

**Scott 0:16:25**\
The plan, I guess.

**5 0:16:27**\
Hold on. Or you can have a look at it. It should be obvious.

**Scott 0:16:30**\
There are, okay. Commander plan is what we talked about with aims.

**Tom 0:16:36**\
And then the priority list is, okay, so what's the immediate list of things we
need to do? So the plan is what we're talking about, about the high level. And
the priority list is, okay, so. So what was suggested in the plan.

**Tom 0:16:50**\
The plan is the thing that we should be able to overwrite Commander on. The
priority list is generated based on the plan. So, the discussion around just
checking to see whether a headmark is right in this should always be right.
Okay, so, um... These, uh... This is an error, this statement because it
shouldn't be saying what's in the stuck like this is

**Tom 0:17:21**\
about the stuck and not it shouldn't be containing information the stuck should
be linked to and if you want to read it you follow the link but it shouldn't be
telling me anything about the stuck in here. Okay so the commander plan should
only have links. That's right, that's right. So what I wanted to talk to you
about today was I had a glimpse of what the commander system could be

**Tom 0:17:44**\
and as humbly as I can I want to talk to you about it without...

**Scott 0:17:48**\
Okay, so what we've just been talking about is the format of the stocks

**Tom 0:17:49**\
and what Tom's about to talk about is the plan for how we get the commander to
generate those. Coming in and squashing the work that you're doing because it's
meant to be like, I think I saw some stuff that can help us. I never worry about
coming in and actually correcting.

**6 0:18:11**\
I love when I've made a mistake.

**Tom 0:18:12**\
Okay, I don't love it, but... The general principle of the commander appears to
be, or the functioning, the architecture of it, the workflow of it, how it runs,
it appears to be that there is a set number of key files that have something
like a reason to change about them. So, like, there's the command plan, there's
the priority list. I'd like to mark this as a new topic that is a subtopic of
the commander that has to do with the reason to change.

**Tom 0:19:02**\
And what the architecture should be doing is whenever there's new information
that comes in, like a transcript, it should read the reason to change for every
one of these live files or generated files, and it should compare the transcript
to the reason to change and say, does this transcript cause a reason to change
for this particular key generated file? And if so, how?

**Tom 0:19:24**\
Right? And it can also represent folders like stucks. But if you process the
transcript with one point of view or one purpose at a time, then you get a
cleaner kind of an output, keeping in mind that generating that output can also
trigger other reasons to change for other key generated files. Like if you make
a new stack, that should trigger a reassessment of the priority plan because
where is the stack on the plan.

**Tom 0:19:47**\
So are you talking about something like a trigger level below which that file is
not updated? You're just... oh man, I don't know. Sort of. What I'm trying to
get at is that there is a side issue here about what the trigger level is, below
which the file needs to be identified as something that has a trigger level. If
that trigger level is exceeded in whichever metric is used, then it can be
edited. If it's not exceeded, then the file remains as is.

**Scott 0:20:33**\
Okay, continuing the recording.

**Tom 0:20:35**\
Commander is taking shape in my mind as a series of concurrent processes that
all take in the new information and run it in a narrow scope, such as, do I need
to add a new stack? Do I need to modify the priority list?

**Scott 0:20:52**\
Yes.

**Tom 0:20:53**\
And the point is that the priority list is represented by a single file. And so
you've got some instructions in the commander that says, here's the steps you go
through. Number one, look at the priority list and blah, blah, blah, blah. And
so it's like a workflow that's described by steps where each step represents a
file that you may need to change.

**Tom 0:21:11**\
Or sorry, a file area that you may need to change. Because right now, you're
kind of doing that, but it's a bit sloppy. And this system I can see now is
discrete, in that it can be added to, expanded to. You know, like you can have a
reason to change section

**Tom 0:21:27**\
in the project that's called Commander Processes. And so when you and I talk and
we're like, oh, that should be a commander process, then the commander processor
reason to change looks at the transcript and says, in this transcript, is there
anything that says

**Tom 0:21:42**\
that there should be a new commander process that needs to be created? And then
if we just talk... So note carefully on what Tom was saying there, we need to
have some form of commander processes. The conversation coming up now is going
to discuss

**Tom 0:21:58**\
what those processes may be, but this is definitely a step that we need to
define. If you talked about a new one, it would go, yes, there was a new process
mentioned, and it's this. And that's how you make a new reason to change file
with a new generated file or folder to look after. And then that gets added to
the list of things that gets run every time there's new information that comes
in. So are you saying, I think what you're saying is, a commander should be
aware of, given the transcript you just described, a

**Tom 0:22:29**\
new process. That process doesn't exist. And therefore it needs to flag saying
there is a stock that needs to generate that process. What Scott just said there
was important. We need some method of discovering processes that we don't have,
but which nevertheless the work process that we do have has sufficient friction,
that it's obvious that we should improve that process.

**Scott 0:23:01**\
It could do it like that or it could just implement the process because that's
sort of,

**Tom 0:23:04**\
it doesn't need to go through the stuff process to generate the new process.
It's just a little bit redundant just because of the nature of the process. I'm
not confident to do MSU to SHOP process change just because of the downstream
impact. The point I'm trying to get at is that the commander is actually a
collection of processes that get run. And those processes are special in that
they focus, they trigger when new information comes in, and then they generate a
specific file or folder based on their area of concern or their mandate.

**Tom 0:23:41**\
So how to re-work that, if you agree, is there is a command called NAP that has
access to a bunch of tools which are in themselves NAPs. It understands when it
should trigger it and when it's being asked or something's being commented on
that it doesn't have a tool, it comes back and perhaps simply generates the NAP
if it's trivial or generates the stuff if it's non-trivial and then that stuff
can be in turn generated into a NAP.

**Tom 0:24:02**\
Correct, yep, yep, yep, 100%, 100%. So, um... Mark that as a point of agreement.

**5 0:24:09**\
Um... Yep, 100%.

**Tom 0:24:11**\
The key thing is, anytime information changes,

**5 0:24:14**\
the whole process kicks off,

**Tom 0:24:16**\
including when the process itself changes information, because now it needs to
redo the process because of what? Just alter it. So there's a like a- It's just
a commander in app saying, I've got a bunch of processes, I know what these
processes are. If what I've just ingested can be satisfied by the process I've
got, happy days. Otherwise I've got a kind of default process,

**Tom 0:24:36**\
which is I don't know how to do this process. No, I was meaning something
different. I was meaning let's ignore the process

**Scott 0:24:40**\
of adding new processes

**Tom 0:24:42**\
and just focus on the processes that are in position. Every time there's a new
commit, those processes need to trigger, including when those processes run,
they may change files on the file system that should cause the process to rerun
again.

**Scott 0:25:03**\
We need to understand what the basis of that misunderstanding is, given the
previous discussion.

**5 0:25:10**\
Okay.

**Tom 0:25:11**\
I'm feeling like you got me there. No, no, no, I totally agree with your
concept. It's just a slight queasy feeling of runaway repetitive iteration of
process. Well, I've got an answer for you there, because that should be another
commander process, which is the watchdog process as described by Tom.

**Tom 0:25:43**\
Or just say, you guys need to check this because this is... Something like that,
right? And then that figure, that stops the endless loop. Plus the thing to
remember, thanks to the limit on a person's credit card, you can't go further.
Okay, yeah, I see what you're saying there. Now, at the moment, Commander is
just a prompt. It's quickly turning into needing to be an actual process. It
needs to, yeah, it's the NAP-to-NAP process, so the Commander needs to, if he's
got a whole bunch of tools available to him, he needs to be able to kick off
another NAP.

**Tom 0:26:17**\
They also need to be dynamically configured as well. So they need to be
stateful, as in the commander may have a folder that lists the processes that
need to be run in order, and those processes are just effectively natural
language prompts. And they can be different for each project, or they can be
standard or whatever. But the only difference is what those files are.

**Tom 0:26:44**\
So it's not really, it is fluid or stateful. Well, this is another topic I know
where time is short, and so this is something to be discussed another time. But
I'm backing off from my stance about defining formats, because if the format
itself is self-coherent, O1 kind of gets it.

**Tom 0:27:02**\
So one does not need the format. yeah, so my thoughts on that topic, which I
think should be captured under a stuck, which is, it's like a sub-stuck of the
stucks format, which would say that we should be open to extensibility of the
format, and we should be able to declare a format.

**Tom 0:27:20**\
And the way to do that is inside the nap.json, I want to put an optional key
that is the stacks key, and the stacks key points to a nap that deals with the
stacks that relate to this nap. Therefore, you can choose whatever format you
want your stacks to be in by what you set that key to. And it means that you can
pick highly constrained stuck formats.

**Tom 0:27:41**\
You can concatenate different formats together and accept the whole range. Like,
the stucks, a stuck should be just a string. A string is its only, in fact, it
doesn't even need to be that. It just needs to be a byte array, because it could
be audio. It's not for us to say what the format of a stuck is, but for our own
utility, we will pick one that works for us.

**Tom 0:27:57**\
But the system doesn't distinguish, and I promise you, whatever format we come
up with, letting O1 just flop onto whatever one suits it is going to be better
for us than us trying to dictate a range of hints. I agree with Bucky. Note what
Tom was just saying there about the need for a sub-stuck and that the stuck
format is undefined so long as it is self-coherent, which is what Scott was
saying. I don't agree with it. I don't think we need to even choose what works
for us.

**Tom 0:28:30**\
We let Commander... No, but that is choosing. That is us choosing. Yes, I agree
with you, but that is us choosing. Where someone else might want to use pure
audio, right? Like, just the generics of the system needs to support, it's just
byte arrays and how

**Tom 0:28:41**\
you interpret it. So a stuck, I'm starting to think about it as a black box of
information that you can query through natural language, and it understands what
the stuck is.

**Tom 0:28:52**\
You can come at it from any direction. But the only thing that it needs to do is
understand that the stuck is a problem that needs to be solved and is
consistent, self-consistent, in what it's saying. It doesn't have to be
consistent with other NAPCS or other stocks. Okay, alright. How much time have
you got?

**Tom 0:29:08**\
You must have done for minutes.

**6 0:29:09**\
I've got 30 minutes left.

**Tom 0:29:10**\
Oh, I thought you said 5.0. I said 5.0, not 15. But that's a useful thing. I
mean, we managed to pack more in just because of that. Whatever. Okay, so,
right, what's next on the slide?

**Tom 0:30:05**\
Can you give me just a second to think? That system of making the commander, if
you have a competing view on what that should be, like, I think you'd need to,
yeah, like it would be great to know if you have a competing view on that.
Because to make the commander like that means that we need that ability to run
NAP to NAP communications sooner than the CRM guys need it.

**Tom 0:30:32**\
Yes, and I'm sorry for banging on about it, but on this site, NAP to NAP comms
is like... yeah, so I mean, that needs to be much higher priority than it is at
the moment because it unlocks

**Scott 0:30:54**\
much of what's being talked about

**Tom 0:30:56**\
Means for why I sort of am pushing for this architecture for the commander is
because it has become apparent that there are other types of information that
are relevant to the commander that aren't just stucks there are dynamically
generated lists or sorry curated lists of things like goals or rules or
strategies, right?

**Tom 0:31:17**\
We were talking about the demand that you're talking about, not demand in terms
of what you've got, but demand in terms of expert systems. It's minimal, but
yeah, the identification of those need to be done very carefully because it can
have huge repercussions depending on what they are, but also using externally
looking, out-looking things.

**Tom 0:31:44**\
So for example, if we were to say that we want a commander, just to give an
extreme example, we want a commander that does this process, which is the one
we've just gone through, we want another set of reasoning saying, why are you
doing that?

**Tom 0:32:05**\
Because O3 is coming along and O3 seems to be able to do it. So the commander
also needs to be given a set of bets about the future that we have reasoned
through. Some of them are simple and they're just fact. They're like O3 mini is
highly likely to arrive at the end of January. So factor that in. Right, and
there's information about, it's almost situational awareness.

**Tom 0:32:32**\
That's right, that's right. I bet it's the Admiral, let's call it, because we've
gone with commander. I don't, it's not a different agent. It's just information
that the agent is processing.

**Tom 0:33:31**\
Yes, I agree with that, and you said something very important at the start,
that's not a task for the commander, that is a safe mask. That's the humans. We
set the rules. This is where DAO governance, DAO operations fit. Because a DAO
being a collection of humans that hold the keys,

**Tom 0:33:44**\
like the board of a company, they say what those... Basically, if anyone asks
the commander for its opinion, we'll give it to it. We set the commander's
opinions. I agree with all this.

**Tom 0:33:56**\
Forgive me for rephrasing it again into naval terms, but what you just described
as grand strategic... It's a hierarchical knowledge structure. Something like
that, yeah, yeah, yeah. how to think. yeah, how to think, and then what to think
about. And then what you're going to do. so the commander should be able to
highlight an area where there is uncertainty and where it needs a decision from
the board or the DAO or whatever. It should be constantly lobbing up
well-reasoned questions. yes, but it's not in the commander's gift to just do it
all. That is us telling it. yes.

**Tom 0:35:02**\
So that's a stop, right? We want an extended looking thing that looks at our
process and sees what we should do or should not do.

**Tom 0:35:04**\
That's just simply part of the set of rules that we want to add or well-reasoned
definitions that we want to add to the commander that says how we want it to
think, what we want it to consider when it's making a choice. And one of those
things is here's some facts about the future that we know. Include that in your
decision-making, that's all.

**Scott 0:35:12**\
Note that last point, which is quite important. These are rules that the
commander should take into account and have an externally looking source of
information

**Tom 0:35:23**\
to make sure that we're not doing work that we don't need to because reasonably
we have information that someone else is going to do it for us. I actually
realize now that I did get a one to describe what I was trying to say. Would it
be okay if I read it out? Okay, at this point, Tom reads out a section and I
will read it out now.

**Scott 0:35:54**\
The core structure of the project is maintained by a set of key files, each
backed by a reasons to change document. These documents define the purpose and
the conditions under which their associated files should be updated. its reasons
to change, correction. When new information such as a transcript or data feed
arrives, the system inspects each file against its reasons to change. If
conditions are met,

**5 0:36:25**\
the file is updated accordingly,

**Scott 0:36:28**\
ensuring that the project's foundational material remains accurate and relevant.
This update process is not isolated. Each file's change may trigger downstream
modifications in related artifacts, such as tasks, reports or other projects, or
project management docs that depend on the altered files. By systematically
cascading updates through the network of related files,

**Scott 0:37:22**\
the process ensures that each piece of input data propagates consistently,
maintaining a coherent and fully synchronized project state. I'll now continue
with the recording. You want to skip on, move on?

**Tom 0:37:38**\
No, no, no. Let me read and ask questions. So, you've heard. Yeah, so there's
that. Right. The construction project contains a set of key files,

**Tom 0:37:47**\
which are backed by a reasons for change document. We've agreed with that, we've
talked about that, that's fair enough. These documents define the purpose and
conditions to which their associated files should be updated. So it's like the
jurisdiction, should they or should not be updated is the answer to this
question.

**Tom 0:37:58**\
When each information such as transcript of data feeds arrives to some
inspection trial against reason for change. If conditions are met, the file is
dated accordingly.

**Scott 0:38:07**\
So that's basically talking about trigger conditions, about whether or not to
update.

**Tom 0:38:11**\
And talking about the fact that the commander is actually simply a collection of
trigger conditions.

**Scott 0:38:16**\
This update process does not isolate these files, change may trigger downstream
modifications in related artifacts, such as tasks, reports. That's the issue
today, and we set up a safeguard to Copic, you know, right now. Yes, it's likely
that's getting updates to the network. That's basically saying the same thing.
We put that to the HPC, yeah, and that's the reason for that.

**7 0:38:33**\
Yeah, OK.

**9 0:38:34**\
Yeah, yeah.

**Tom 0:38:35**\
But the piece I'm trying to get across to you now is this bit, which is not
being reasoned with O1. It's just me trying to sloppily express what I want,
like...

**Scott 0:38:44**\
I'll now read out what Tom is highlighting on the screen. Where to insert goals
and justification of those goals so they are well reasoned. For example,
figuring out consensus is important but where should that rank? How can we
account for the pattern of seeing how to do it so it's easy right away versus
laboring hard just because I was told it was time. The difference between
opportunity and discipline. Continue the recording.

**Tom 0:39:26**\
Like, we should reach consensus on what the goals of the commander are or the
justifications of how it thinks and all that. Like, that's a critical thing that
the commander can't do that's us and I suspect that that's a doubt but that's
what a doubt would do is it would agree on how the heuristics of the task or the
management at hand needs to occur the Dow would agree on what how the future is
going to unfold according to its members you know like you might think that
Trump's really bad you might think that Trump's really good

**Tom 0:39:56**\
but you need a human needs to save. Narrative note, DAO is D-A-O. That means
distributed autonomous organization. These are the facts, these are the
predictions, and these are the rules of optimization that we want to apply. Yes,
I agree with that, and you said something very important at the start, that's
not a task for the commander, that is a safe mask. That's why I said admiral.
That's the humans.

**Tom 0:40:35**\
You're not an admiral, I'm not an admiral. Compared to O1 we're just bums. But
we hold the keys. We set the rules. This is where DAO governance, DAO operations
fit. Because a DAO being a collection of humans that hold the keys,\
like the board of a company, they say what those... Basically, if anyone asks
the commander for its opinion, we'll give it to it. We set the commander's
opinions. I agree with all this.

**Tom 0:40:56**\
Forgive me for rephrasing it again into naval terms, but what you just described
as grand strategic strategic and tactical.

**Scott 0:41:22**\
Narrative note. This is important. There is more to a stuck than simply trying
to generate a nap. Not all stucks generate a nap. Um... Oh, return.

**Tom 0:41:38**\
I'll return. We texted, I can't remember. But yeah, it's like, you want an
outcome that doesn't result in an app. No.

**6 0:41:47**\
But you want something that can happen.

**Tom 0:41:48**\
No. No.

**5 0:41:50**\
Okay, all right.

**Tom 0:41:51**\
Hang on, sorry. In the current space with AI, things are changing so radically,
and they're just going to keep on changing. And there are a list of
decision-making rules that we have come up with or recognized. Like, for
example, if you need something and you're pretty sure that it's just gonna
happen, like OpenAI's gonna build it

**Tom 0:42:05**\
in like a few months, don't spend even a second more thinking about it, get on
with something else and just wait. It's the first time that's been of use to me.

**Tom 0:42:17**\
We are not smart enough to take that rule and 50 other rules that are of similar
intellect and then look at 200 stocks and say, therefore, the next thing is
stock number 27, and here's why.

**Scott 0:42:39**\
Yeah, so I get that. The takeaway is, okay, if I've done that with heuristic of
going through each file,

**Tom 0:42:56**\
But what you're talking about is a kind of matter of why. No, I'm talking about
a way to give the commander a set of goals that aren't, I think the word is
wrong, like it's not goals, it's like how to think and how we would like this
project thought about.

**Tom 0:43:18**\
And we say what those are and it applies and that's the intelligence. So, let's
go back to expert systems where you define your heuristics. We were talking
about the demand that you're talking about, not demand in terms of what you've
got,

**Tom 0:43:30**\
but demand in terms of expert systems. The right strategy in this game is to do
nothing if you think this thing's going to be delivered for you. So we have a
judgment call about what to do nothing with. The commander also needs to be
given a set of bets about the future that we have reasoned through. Some of them
are simple and they're just fact. It's almost situational awareness. That's
right, that's right. So anyway, that's one of the things going through because
that's why every stock changed. I thought, do I care? It's got more information.
You don't care. You don't care. I certainly don't care.

**Tom 0:44:08**\
And to be honest with you, buddy, I'm only going to read these stocks through
the lens of O1 anyway. So it's not like even changing. So long as you're
consistent, consistency is irrelevant in format. It doesn't matter, even if you
only drew an Egyptian hieroglyphs or spoke in Yiddish, consistency is
consistency. That's galactic as well.

**Tom 0:44:26**\
That's universal. Exactly. And so a stuck, I'm starting to think about it as a
black box of information that you can query through natural language, and it
understands what the stuck is.

**Tom 0:44:36**\
You can come at it from any direction. But the only thing that it needs to do is
understand that the stuck is a problem that needs to be solved and is
consistent, self-consistent, in what it's saying. All right. How much time have
you got?

**Tom 0:44:44**\
We want a commander that looks at all those rules, sees that the big file is a
problem, sees that we've got an approach. Right, so let's talk about that next
time.

**Scott 0:44:52**\
Sure.

**Tom 0:44:55**\
Yes, that’s it. Good.

**Scott 0:44:56**\
Okay, continuing the recording.

**Tom 0:45:00**\
So what am I…

**Scott 0:45:02**\
And then if you go to the summary, this should relate to the key points we
talked about last night.

**Tom 0:45:17**\
Right, so let’s go back to the summary.

**Scott 0:45:22**\
So this is the summary. So this is the summary. So this is the summary.

**Tom 0:45:29**\
The commander should break large goals into drops, yeah, but it doesn't actually
talk about breaking up the CRM. We were definitely talking about that.

**Scott 0:45:59**\
One of the things you were saying is, get rid of the thing, sorry, I guess I
should just…

**Tom 0:46:10**\
One of the things I'm being aware of in these conversations is signposting. And
this may or may not be a good example of it, but I think the point stands. I
know what you mean, but I'm also convinced that with the right process in place,
O1 doesn't need the signposting. O1 is smart enough if we find how to make it
grind over it. That condensed approach is a good one.

**Tom 0:46:55**\
Usually, if you've got a bit of time, I'm at the bottom of my to-do list to talk
to you about this. But this will be useful. Let's go through the process that
you usually go through with taking down the transcript. So dumping the
transcript first, and then saying here's condensed one.

**Tom 0:47:06**\
And then let's ask questions of it and see if Owen is doing what we need to do.
So this is my query that's running. Now, what was your query? So dumping that
first. Dump in the condensed. So dumping that first. Dump in the condensed.\
Yeah, shouldn't I ask my question now?

---

_Transcribed with Cockatoo_
