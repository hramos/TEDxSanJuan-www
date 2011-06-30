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
  puts 'DEPLOYING TO PREVIEW.TEDxSANJUAN.COM'
  # remove --rsh piece if not using 22
  sh "rsync -rtzh --progress --delete _site/ --rsh='ssh -p22' hramos@helios:~/_tedxsanjuan"
  puts 'done!'
end

desc 'convert html to markdown'
task :markdown do
  my_files = FileList['_posts/*.html']
  my_files.each do |file|
    sh("./_posts/html2text.py " + file + " > " + file[0..file.length-5] + "markdown")
  end
end

desc 'generate old to new post mapping'
task :redirects do
  counter_old = 1
  file_old = File.new("old.txt", "r")
  old_paths = Array.new
  while (line = file_old.gets)
    old_paths[counter_old] = line
 #   puts "#{counter_old} => #{line}"
    counter_old = counter_old + 1
  end
  file_old.close

  counter_new = 1
  file_new = File.new("new.txt", "r")
  new_paths = Array.new
  while (line = file_new.gets)
    new_paths[counter_new] = "#{line}"
    puts "#{counter_new} => #{line}"
    counter_new = counter_new + 1
  end
  file_new.close
  
  if (counter_old == counter_new)
    puts "matching paths"
    file_final = File.new("redirects.txt","w")
    old_paths.count.times do |ix|
      file_final.write "Redirect 301 #{old_paths[ix]} #{new_paths[ix]}"
    end  
    file_final.close
  else
   puts "uneven match #{counter_old} to #{counter_new}"
  end
    
end

desc 'upload images to cloud files'
task :cloudfiles do
  require 'cloudfiles'
  cf = CloudFiles::Connection.new(:username => "", :api_key => "")
  container = cf.container('www.hectorramos.com_images')
  
  my_files = FileList['_uploads/*']
  my_files.each do |file|
    filename_chunks = file.split "/"
    filename_chunks = filename_chunks[1].split "?"
    puts "Uploading " + filename_chunks[0]
    object = container.create_object filename_chunks[0], false
    object.write file
  end
  
end