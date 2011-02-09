desc 'nuke, build and compass'
task :generate do
  sh 'rm -rf _site'
  jekyll
end

def jekyll
  # time to give me generation times
  # I'm just curious about how long it takes
  sh 'time jekyll'
  # compass already configured via config.rb in root
  sh 'compass compile'
end

desc 'deploy to pstam via rsync'
task :deploy do
  # uploads ALL files b/c I often do site-wide changes and prefer overwriting all
  puts 'DEPLOYING TO PUBLICACCION.NET'
  # remove --rsh piece if not using 22
  sh "rsync -rtzh --progress _site --rsh='ssh -p22' hramos@helios:~/jekyll"
  puts 'done!'
end