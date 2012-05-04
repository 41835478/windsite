package com.google.javascript.jscomp;

import java.io.File;
import java.util.Collection;

import org.apache.commons.io.FileUtils;

public class CompileJs {
	public static void compile(String fromJs, String toJs) {
		String[] args = new String[] { "--js", fromJs, "--js_output_file", toJs };
		CommandLineRunner runner = new CommandLineRunner(args);
		if (runner.shouldRunCompiler()) {
			runner.run();
		}
	}

	@SuppressWarnings("unchecked")
	public static void main(String[] args) {
		Collection<File> files = FileUtils.listFiles(new File(
				"E:\\project\\wind\\aws\\Apache2.2\\htdocs\\assets\\huabao"),
				new String[] { "js" }, true);
		if (files != null && files.size() > 0) {
			for (File str : files) {
				args = new String[] { "--js", str.getAbsolutePath(),
						"--js_output_file",
						str.getAbsolutePath().replace(".js", ".min.js") };
				CommandLineRunner runner = new CommandLineRunner(args);
				if (runner.shouldRunCompiler()) {
					runner.run();
					System.out.println(str.getAbsolutePath());
				}
			}
		}

	}
}
