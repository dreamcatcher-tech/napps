# Overview

The whole purpose of this module is to be run as a background process to read
from a remote file server so that we can figure out basically what was the last
modified time of the latest modified document that we currently have stored on
the server. And then to make a query using the REST API against the MoneyWorks
system to get any records that have been modified since that date. We need to
pull them in in manageable chunks of a turnable parameter say between 10 and
100. And then when they come in we need to then store them on the server. We
then wait for the configured amount of time that we've been asked to wait for
and then we do the poll again. When the module starts it needs to get access to
the MoneyWorks URL which will include the password for accessing it. It needs an
API key to access the remote file storage and it needs a URL for that file
storage which will include a branch information because the remote file storage
is actually a rather large git service.

An extended purpose of the service, which will come later, is the ability to
detect changes in the file server version of all the XML documents that we've
extracted, and to then push those back into the MoneyWorks server, and so there
needs to be some way of hooking the remote database to watch for changes. What
will happen is that the changes will occur in a dedicated changes branch. We
will watch the changes branch for changes. When they have occurred, we will
compare them with our version of the main branch. Only we can make changes to
the main branch, only the XML importing service. We will first of all do a poll
to make sure we have the latest versions of everything before doing a save to
avoid any conflicts. We will then look at what changes are due to be made in the
incoming branch. We will take those changes and insert them into the MoneyWorks
server. Once we have done that, we will do a poll where the polling should have
been suspended during the time that we were doing this reconciliation process or
writing process. Once the documents have been inserted, we do another poll from
the MoneyWorks database to get the XML data out. We then confirm that the XML
data is identical to the changes branch. We push those or commit those, no wait,
we don't do the commit, we then merge in the incoming branch to guarantee that
it now is exactly the same as the main branch and then we commit and push these
back to the revised server. Any processes that were awaiting the change to be
applied would know that things had been completed because now the main branch,
the piece of data that they changed on the changes branch is now identical to
that same customer record on the main branch.

# Requirements

be able to mock the moneyworks server for testing, where we can change records,
and test if the polled result comes back different and triggers a ui update that
we expect.

make an anonymization tool that can randomize large amounts of xml data so that
we can use it for testing. But never commit this data, so it always stays local.

set up deno deploy to receive git objects in bulk, out of order, then only when
we're done with the upload, we can commit

? does terse xml give repeatable results ?

Be able to configure what tables it is configured to poll and track

Allow downloading all the transaction data too, which could take a long time -
this should do some checkpoints over time, so we get a commit in batches. Would
need to use a strategy for making git dirs that do not break from the sheer
size.

Before any merge, read from moneyworks first. Then check for conflicts. If no
conflicts, do the merge into main. Once the server detects main has been merged
with pending, then we can report back to the user that the save was successful.

We must be able to handle the time being changed on the server.

Must be able to mock the xml extraction process, so we can test the whole system
end to end.

Must be able to mock the storage process.

Logs must output sync summary data, like what records changed, and what fields
in those records changed. When writing, start by saying we detected a write, and
then log the process of applying those changes.

On main, as part of the config, we must store a sync marker, so we know the last
modified time of the last record that we have, which we use in the query to get
only what has changed.

Config must allow us to trigger a full sync. During full sync, only records that
are different are written. Full sync can be a check only, which errors if
differences are found, rather than applying those errors and potentially hiding
the source of those errors.

Error if main changes without our knowledge - this is a fatal error and requires
human intervention.

Each time changes are committed to the moneyworks branch, we include what our
current config is (which can be used to determine if the changes branch config
has been applied) and we include the last sync marker.

# Questions

1. If I have remote changes that are stored on a dedicated changes branch and I
   want to synchronize them back into Moneyworks given that Moneyworks data is
   stored on the main branch, what's the best strategy to apply here? One of the
   ideas is to keep the branches separate so they never actually merge, have the
   remote side watch the main side to know when the main side has been synced
   and also to detect when there are conflicts that have arisen which would
   require the remote side to adjust what they were trying to change and then
   try again. What other strategies could I apply for doing this?
